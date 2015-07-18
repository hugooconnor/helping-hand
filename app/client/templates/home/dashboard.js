Template.dashboard.events({
    'click #signout' : function(e, t){
      e.preventDefault();
      console.log("signout clicked.");
      Meteor.logout();
      },

      'click #add-partner' : function(e, t){
      e.preventDefault();
      console.log("add-partner clicked.");
      },

      'click #add-helper' : function(e, t){
      e.preventDefault();
      console.log("add-partner clicked.");
      },

      'click #add-helpee' : function(e, t){
      e.preventDefault();
      console.log("add-partner clicked.");
      },


  });

Template.dashboard.helpers({

});