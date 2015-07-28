HomeController = RouteController.extend({
  layoutTemplate: 'MasterLayout',

  subscriptions: function() {
  	return Meteor.subscribe('homeReports');
  },

  action: function() {
    this.render('home');
  },

});
