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
  this.route('addAlert');
  this.route('addReport');
  this.route('about');
  this.route('editEmail');
  this.route('editAlert', {
  // get parameter via this.params
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
