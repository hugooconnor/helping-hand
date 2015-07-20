Template.dashboard.events({
    'click #signout' : function(e, t){
      e.preventDefault();
      console.log("signout clicked.");
      Meteor.logout();
      },

  });

Template.dashboard.helpers({
  reports: function () {
      var start = new Date(Date.now()-14*24*60*60*1000);
      return Reports.find({helpee: Meteor.user().username, created: { $gt: start}}, {"sort" : [['created', 'desc  ']]});
    },

  //add health calculation here.
  health: function () {
    var username = Meteor.user().username;
    var start = new Date(Date.now()-14*24*60*60*1000);
    var reports = Reports.find({helpee: username, created: { $gt: start}}).fetch(); 
    var health = 100;
    var weighting = 0;
    if(reports.length == 0){
      health = 100;      
      return health;
    } else {
      for (var i=0; i< reports.length; i++) {
      //todo: add health as function of time.
      var days = new Date(Date.now() - reports[i].created).getTime();
      var weight = 1 - Math.pow(parseFloat(days)/parseFloat(14*24*60*60*1000), 2);
      weighting += weight;
      health += parseInt(reports[i].health)*weight;
      }
    return (health/(weighting+1)).toFixed(2);
    }
  },


  hearts: function(n) {
    if(n < 100 && n >= 80)
      return "<i class='icon ion-heart></i>";
  },

  who: function () {
    return Meteor.user().username;
  },

  noHelpers: function () {
    var helpers = Meteor.users.find(Meteor.userId()).fetch()[0].helpers;
    if (helpers.length > 0) {
      return false;
    } else {
      return true;
    }
  },

  helpers: function () {
    var helpers = Meteor.users.find(Meteor.userId()).fetch()[0].helpers;
    var helpersFull = [];
         for (i=0; i < helpers.length; i++){
            helpersFull.push(Meteor.users.find(helpers[i]).fetch()[0]);
         }
         return helpersFull;
  },

});