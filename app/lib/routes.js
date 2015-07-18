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
  this.route('join');
  this.route('dashboard');
  this.route('settings');
  this.route('addHelpee');
  this.route('addPartner');
  this.route('addHelper');
});