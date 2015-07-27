Template.addAlert.events({
    'click #set-alert' : function(e, t){
      e.preventDefault();
      var subject = t.find('#alert-subject').value;
      var health = t.find('#health').value;
      var body = t.find('#alert-message').value;
      var user = Meteor.userId();
      
      Meteor.call('addAlert', user, user, subject, body, health);
      
      console.log("Alert created")
      Router.go('settings');
      return false;
      },


  });

