# Atlas 🌎 
Atlas is a online application that connects to a websocket (provided by geo-locater) and displays a map with potential live and demo attack data.
### Installation
Atlas has been tested and confirmed to work on [Apache][apache] 2.4.7 and is believed to work on later versions as well.  
1. Install Apache: `$ sudo apt-get install apache2`
2. Download Atlas: `$ git clone https://github.com/Marist-Innovation-Lab/Atlas.git`
3. [Configure Atlas](#configuration)
4. Move the contents of Atlas to the Apache webserver directory `/var/www/html/` with the command `$  mv -v Atlas/* /var/www/html/` NOTE: you may need elevated permissions to perform this action. An alternative solution would be to owner and permissions of the `/var/www/` directory with the command `sudo chown -R [USER NAME]:[USER NAME] /var/www` replacing USER NAME with your own.
5. Restart Apache2! `sudo service apache2 restart`

### Configuration
Atlas needs a websocket server to communicate with in order to properly function and perform its mapping duties. To add this, naviage to [Atlas/script/attack.js][script] and change the IP address in the line: `var socket = io.connect('http://10.11.17.141:8080');` to wherever you are hosting your geo-locater application.

### Usage
To use Atlas, press the Run Demo button at the bottom of the page. Atlas is currently configured to also take a 'custom attack' where you can upload any properly formatted .json attack file. An sample of one of these custom attacks is located in the geo-locater [repoistory][SampleAttack]. 

It is important to note that geo-locater emulates time-delayed attacks by comparing the difference between the timestamp of the current attack and a lookahead to the timestamp in front of it. Timestamp is not a timestamp *per se* but is used to determine how long to wait before displaying the next attack.




[apache]:https://httpd.apache.org/
[script]:https://github.com/Marist-Innovation-Lab/Atlas/blob/master/script/Attack.js
[SampleAttack]:https://github.com/Marist-Innovation-Lab/geo-locater/blob/master/geo-locater/demo/SampleCustomAttack.json
