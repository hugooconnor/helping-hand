Template.addReport.events({
    'click #report' : function(e, t){
      e.preventDefault();
      console.log("signout clicked.");
      Meteor.logout();
      },
  });