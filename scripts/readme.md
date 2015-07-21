Local Dev Setup
===============
- Install Meteor (meteor.com)
- Set up Android dependancies (https://github.com/meteor/meteor/wiki/Mobile-Dev-Install:-Android-on-Mac)
- Set up iOS dependancies (https://github.com/meteor/meteor/wiki/Mobile-Dev-Install:-iOS-on-Mac)
- Install graphicsmagick - brew install graphicsmagick

Run locally
===========
run "iron" from the v0.2 root to lauch a server at http://localhost:3000

Run in iOS simulator
===================
run "sh run_ios_local.sh"

Settings
========
The settings available in Meteor.settings are found in config/development/settings.json for local dev and ./settings.json for the production version.

Server Dependencies
===================
- Node 0.10.36 server
- Mongo v2.6.10
- graphicsmagick (http://www.graphicsmagick.org/) - apt-get install graphicsmagick

Server Setup
============
- run "mup deploy" from local machine to set up node, meteor, mongo and deploy app to server
- to reconfigure server without having to redeploy app run "mup reconfig"
- Configure the Nginx proxy to allow access to server (https://www.digitalocean.com/community/tutorials/how-to-deploy-a-meteor-js-application-on-ubuntu-14-04-with-nginx), the nginx config file is in server-config/sites-available/app in this repository

Server Admin
============
- Access the server by SSH with "ssh root@ho-bear.com"
- The application is located at /opt/honeybear
- To tail the server logs from your local machine "mup logs -f"

Building for iPhone
===================
run "sh build_ios.sh", this will build and open the Xcode project which points to the live server

In Xcode:
1. Product > Archive
2. Submit to App Store
3. Administer in iTunes Connect

Building for Android
====================
run "sh build_android.sh", this will create an Android build at ~/Desktop/build/android/production.apk

upload production.apk to Google Play or use android device bridge to install on USB connected device with "adb install production.apk"


