rm -R ~/Desktop/build
cd /Users/hugooconnor/Code/helping-hand/app
meteor build ~/Desktop/build --server app.helpinghand.io
cd ~/Desktop/build/android
jarsigner -storepass hugo0614 -verbose -sigalg SHA1withRSA -digestalg SHA1 unaligned.apk helpinghand
~/.meteor/android_bundle/android-sdk/build-tools/20.0.0/zipalign 4 unaligned.apk production.apk