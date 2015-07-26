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
  this.route('reset', {
    path:'/reset/:_id',
    data: function () {
      var resetToken = this.params._id;
      Session.set('resetToken', resetToken)
    }
  });
  this.route('enrol', {
    path:'/enrol/:_id',
    data: function () {
      var enrolToken = this.params._id;
      Session.set('enrolToken', enrolToken)
    }
  });
  this.route('people');
  this.route('join');
  this.route('forgot');
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
  this.route('editHelpee', {
  //send data to alerts
  path: '/helpees/:_id',
  data: function (){
    var _id  = this.params._id;
    var username = Meteor.users.findOne(_id).username;
    Session.set('helpeeId', _id);
    templateData = {
        _id: _id,
        username: username
        };
    return templateData;
        }
    });
  this.route('editPartner', {
  path: '/partners/:_id',
  data: function (){
    var _id  = this.params._id;
    var username = Meteor.users.findOne(_id).username;
    Session.set('partnerId', _id);
    templateData = {
        _id: _id,
        username: username
        };
    return templateData;
        }
    });
  this.route('editHelper', {
  path: '/helpers/:_id',
  data: function (){
    var _id  = this.params._id;
    var username = Meteor.users.findOne(_id).username;
    Session.set('helperId', _id);
    templateData = {
        _id: _id,
        username: username
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
    {except: ['join', 'reset', 'forgot', 'enrol']}
);