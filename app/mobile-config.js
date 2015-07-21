// Set PhoneGap/Cordova preferences

App.info({
  id: 'com.hugo.helpinghand',
  version: '0.0.0',
  name: 'Helping H',
  description: 'A social intelligence app for behavioural modification.',
  author: 'Hugo O\'Connor',
  email: 'hugo.oconnor@gmail.com',
  website: 'https://github.com/hugooconnor/helping-hand'
});

App.launchScreens({
  // 'iphone6': 'icons/splash.png'
});

App.setPreference('StatusBarOverlaysWebView', 'true');
App.setPreference('StatusBarStyle', 'default');

// TODO: enable this
// Allow access to Twitter and Facebook APIs to retrieve Profile pictures
// App.accessRule("https://*.facebook.com");
// App.accessRule("https://*.akamaihd.net");
// App.accessRule("https://*.twimg.com");
// App.accessRule('*.google.com/*');
// App.accessRule('*.googleapis.com/*');
// App.accessRule('*.gstatic.com/*');
// App.accessRule('*.kadira.io/*');
// App.accessRule('geo:*', {launchExternal: true});
// App.accessRule('maps:*', {launchExternal: true});

App.accessRule("*");