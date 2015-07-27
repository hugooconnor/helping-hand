Template.debug.events({
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
      var message = t.find('#message').value;
      
      //var anon = t.find('#anon').value;
      //console.log(anon);
      if (Session.get('anonymous')) {
        var helperId = null;
        var helper = 'anonymous';
      } else {
        var helperId = Meteor.userId();
        var helper = Meteor.user().username;
      }

      Meteor.call('addFeedback', helper, helperId, message);
      
      IonPopup.alert({
            title: 'Thank You',
            template: 'Thank you for your feedback.',
            okText: 'Got It.'
            });

      Router.go('/');

      },


  });

