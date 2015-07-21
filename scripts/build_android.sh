rm -R ~/Desktop/build
cd ~/Sites/honey-bear/v0.2/app
meteor build ~/Desktop/build --server app.ho-bear.com --mobile-settings ../settings.json
cd ~/Desktop/build/android
jarsigner -storepass Iheartsf_01 -verbose -sigalg SHA1withRSA -digestalg SHA1 unaligned.apk honeybear
~/.meteor/android_bundle/android-sdk/build-tools/20.0.0/zipalign 4 unaligned.apk production.apk