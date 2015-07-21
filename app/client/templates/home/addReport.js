Template.addReport.events({
    'click #report' : function(e, t){
      e.preventDefault();
      var username = t.find('#username').value;
      var health = t.find('#health').value;
      var message = t.find('#message').value;
      var date = new Date();
      //var anon = t.find('#anon').value;
      //console.log(anon);

      //change to server method and call
      Reports.insert({ 
            helper: Meteor.user().username,
            helpee: username,
            comment: message,
            health: health,
            created: date,
        });
      
      
        Router.go('/');
        return false;
      },


  });

