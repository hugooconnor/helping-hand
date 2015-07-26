Template.addAlert.events({
    'click #set-alert' : function(e, t){
      e.preventDefault();
      var subject = t.find('#alert-subject').value;
      var health = t.find('#health').value;
      var body = t.find('#alert-message').value;
      var date = new Date();
      //var anon = t.find('#anon').value;
      //console.log(anon);

      //create as server method
      Alerts.insert({
            helpee: Meteor.userId(),
            notify: Meteor.userId(),
            subject: subject,
            body: body,
            health: health,
            created: date,
        });
      
        console.log("Alert created")
        Router.go('settings');
        return false;
      },


  });

