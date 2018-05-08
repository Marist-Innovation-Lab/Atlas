var goog = new L.LatLng(37.751, -97.822);
var notgoog = new L.LatLng(41.7038, -73.9218)

// var latlngs = [];
// latlngs.push(goog);
// latlngs.push(notgoog);



var attacks = new Array();
var sourceMarkers = new Array();
var destinationMarkers = new Array();
var testmarker = L.divIcon({
  iconSize: [12,12],
  className: 'animating-icon',
  html: '<div class="animated-icon"></div>'
});

var myRenderer = L.svg({ padding: 0.5 });
//console.log(line._path)


window.onload = function() {
  // Get references to elements on the page.
  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');
  var demoBtn = document.getElementById('demoDDoS');
  demoBtn.onclick = function (){
      console.log("starting demo.... This demo runs through the first 55 attempts logged from two SSH Honeypots on 9/11/2017 starting at 03:54:08");
      socket.emit('run_demo');
  };
};
// var killdemoBtn = document.getElementById('killdemo');

var socket = io.connect('http://10.11.17.141:8080');
socket.on('connect', function() {
    //alert("Connected to Socket!");
  socket.emit('my event', {data: 'I\'m connected!'});
  });
// Handle any errors that occur.
socket.onerror = function(error) {
  console.log('WebSocket Error: ' + error);
};


// Show a connected message when the WebSocket is opened.
 socket.on('connect', () => {
     socket.send('New Map connected.');
 });


// Handle messages sent by the server.
socket.on('send-to-map', function (attack) {
//  var dstcountry = attack["dest-ip"]["country"];
  var dstlat     = attack["dest-ip"]["latitude"];
  var dstlong    = attack["dest-ip"]["longitude"];
//  var dstip      = attack["dest-ip"]["ip_address"];
//  var srccountry = attack["source-ip"]["country"];
  var srclat     = attack["source-ip"]["latitude"];
  var srclong    = attack["source-ip"]["longitude"];
//  var srcip      = attack["source-ip"]["ip_address"];
  drawAttack(srclat,srclong,dstlat,dstlong);  //dstcountry,dstlat,dstlong,dstip,srccountry,srclat,srclong,srcip);
});

socket.on('send-to-map-withUserInfo', function (attack) {
//  var dstcountry = attack["dest-ip"]["country"];
  var dstlat     = attack["dest-ip"]["latitude"];
  var dstlong    = attack["dest-ip"]["longitude"];
//  var dstip      = attack["dest-ip"]["ip_address"];
//  var srccountry = attack["source-ip"]["country"];
  var srclat     = attack["source-ip"]["latitude"];
  var srclong    = attack["source-ip"]["longitude"];
//  var srcip      = attack["source-ip"]["ip_address"];
//  var user       = attack["USERINFO"]["username"]
//  var pass       = attack["USERINFO"]["password"]
  drawAttack(srclat,srclong,dstlat,dstlong);  //attacks(dstcountry,dstlat,dstlong,dstip,srccountry,srclat,srclong,srcip,user,pass);
});

//};




function drawAttack(srclat,srclong,dstlat,dstlong){
	var source = new L.LatLng(srclat, srclong);
	var destination = new L.LatLng(dstlat, dstlong);

  console.log("Source: " + source);
	var sourceMarker = L.marker(source,{icon: testmarker}).addTo(mymap);
	var newAttack = L.swoopyArrow(source,destination, {color: "red", opacity: 0, factor: 1}).addTo(mymap);
	sourceMarkers.push(sourceMarker);
	attacks.push(newAttack);
	var l = newAttack._currentPath.getTotalLength();
	d3.select(newAttack._currentPath).attr("stroke-dasharray", l + " " + l)
						 .attr("stroke-dashoffset", l)
						 .style("stroke-opacity", 1)
             .style("stroke-width", 2.5)
						 .transition()
						   .duration(400)
						   .ease(d3.easeLinear)
						   .attr("stroke-dashoffset", 0)
						   .on("end", function (){ 	
						   			var destinationMarker = L.marker(destination,{icon: testmarker}).addTo(mymap);
						   			destinationMarkers.push(destinationMarker);
                    d3.select(newAttack._currentPath).style("stroke", "#b20000");//"#600606");
						 })

};

setInterval(function(){
	if (destinationMarkers[0] != null || timedoutAttack[0] != null || timedoutSource[0] != null){
		var timedoutAttack = attacks.shift();
		var timedoutSource = sourceMarkers.shift();
		var timedoutDestination = destinationMarkers.shift();
		
		timedoutSource.remove();
		timedoutAttack.remove();
		timedoutDestination.remove();
	}

}, 3000);