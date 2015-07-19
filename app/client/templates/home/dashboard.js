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
      return Reports.find({helpee: Meteor.user().username, created: { $gt: start}});
    },

  //add health calculation here.
  health: function () {
    var username = Meteor.user().username;
    var start = new Date(Date.now()-14*24*60*60*1000);
    var reports = Reports.find({helpee: username, created: { $gt: start}}).fetch(); 
    var health = 0;
    if(reports.length == 0){
      health = 100;
      return health;
    } else {
      for (var i=0; i< reports.length; i++) {
      //todo: add health as function of time.
      health += parseInt(reports[i].health);
      }
    return (health/reports.length).toFixed(2);;
    }
  },


  hearts: function(n) {
    if(n < 100 && n >= 80)
      return "<i class='icon ion-heart></i>";
  },

  who: function() {
    return Meteor.user().username;
  }

});