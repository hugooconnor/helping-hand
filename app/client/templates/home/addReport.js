Template.addReport.events({
    'change .toggle [type="checkbox"]': function(e) {
                var checkbox = $(e.target);
                if (checkbox.is(':checked')) {
                        Session.set('anonymous', true);
                } else {
                        Session.set('anonymous', false);
                }
        },

    'click #report' : function(e, t){
      e.preventDefault();
      var username = t.find('#username').value;
      var health = t.find('#health').value;
      var message = t.find('#message').value;
      var date = new Date();
      //var anon = t.find('#anon').value;
      //console.log(anon);
      if (Session.get('anonymous')) {
        var helper = 'anonymous';
      } else {
        var helper = Meteor.userId();
      }

      var helpee = Meteor.users.findOne({username: username})._id;

      //change to server method and call
      Reports.insert({ 
            helper: helper,
            helpee: helpee,
            comment: message,
            health: health,
            created: date,
        });
      
      
        Router.go('/');
        return false;
      },


  });

