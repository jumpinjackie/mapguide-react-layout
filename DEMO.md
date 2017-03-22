Demo
====

With [play-with-docker](http://play-with-docker.com), you can easily spin up a demo MapGuide Server instance with this viewer and sample data pre-loaded to see this viewer in action.

 1. Go to http://play-with-docker.com 
 2. Pass the reCAPTCHA check. Once you're in, you will have 4 hours to play around before the site terminates your session and all docker environments you have set up
 3. Click `+ ADD NEW INSTANCE` to create a new shell

![](https://github.com/jumpinjackie/mapguide-react-layout/raw/master/doc/pwd-add-instance.png)

 4. In the new shell, run the following commands
   * `git clone https://github.com/jumpinjackie/mapguide-react-layout`
   * `cd mapguide-react-layout`
   * `./demo.sh`
 5. After a few minutes (while docker downloads the base image and builds the demo image on top of it), the demo container will run and you should see a port number appear beside the IP address

![](https://github.com/jumpinjackie/mapguide-react-layout/raw/master/doc/pwd-port.png)

 6. Click it to open a new browser tab where you should see the default success page from the wwwroot of MapGuide's bundled Apache server

![](https://github.com/jumpinjackie/mapguide-react-layout/raw/master/doc/pwd-success.png)

 7. Now append `/mapguide/index.php` to that URL to enter the demo landing page.

![](https://github.com/jumpinjackie/mapguide-react-layout/raw/master/doc/pwd-landing-page.png)

 8. Click on any template link to load the Sheboygan map in that selected template

Many thanks to @brucepc for his [docker image](https://github.com/brucepc/mapguide), from which our demo image is built on top of.