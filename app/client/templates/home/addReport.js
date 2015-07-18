Template.addReport.events({
    'click #report' : function(e, t){
      e.preventDefault();
      var username = t.find('#username').value;
      var health = t.find('#health').value;
      var message = t.find('#message').value;
      var date = new Date();

      Reports.insert({ 
            helper: Meteor.user().username,
            helpee: username,
            comment: message,
            health: health,
            created: date,
        });
      
      console.log("new report created")
      Router.go('/');
        return false;
      },


  });

