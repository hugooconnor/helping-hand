Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  action: 'action',
  where: 'client'
});

Router.map( function () {
  this.route('reset');
  this.route('people');
  this.route('join');
  this.route('help');
  this.route('dashboard');
  this.route('settings');
  this.route('addHelpee');
  this.route('addPartner');
  this.route('addHelper');
  this.route('addAlert');
  this.route('addReport');
  this.route('about');
  this.route('editEmail');
  this.route('editAlert', {
  //send data to alerts
  path: '/alerts/:_id',
  data: function (){
    var _id  = this.params._id;
    var health = Alerts.findOne(_id).health;
    var subject = Alerts.findOne(_id).subject;
    var body = Alerts.findOne(_id).body;
    templateData = {
        _id: _id,
        subject: subject,
        body: body,
        health: health,
        };
    return templateData;
        }
    });
});

Router.onBeforeAction(function () {
  // all properties available in the route function
  // are also available here such as this.params

  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('home');
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }

  
},
    // add exceptions for join and reset pages
    {except: ['join', 'reset']}
);