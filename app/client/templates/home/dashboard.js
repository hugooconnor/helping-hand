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
    }

  //add health calculation here.

});