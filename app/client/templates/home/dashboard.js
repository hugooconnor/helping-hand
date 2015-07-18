Template.dashboard.events({
    'click #signout' : function(e, t){
      e.preventDefault();
      console.log("signout clicked.");
      Meteor.logout();
      },
  });

Template.dashboard.helpers({

});