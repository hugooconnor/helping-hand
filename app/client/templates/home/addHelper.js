//1. check if user is already in the system
//2. if not, create account
//3. send Accounts.sendEnrollmentEmail with the new id
//4. catch new user at enrol template

Template.addHelper.events({

    'click #invite' : function(e, t){
      e.preventDefault();
      //check data is valid

      var email = t.find('#email').value;
      var userId  = Meteor.userId();
      Session.set('loadingSplash', true);

      Meteor.call('inviteUser', email, 'subject', 'message', userId, 'helping', 'helpers', function(error, result){
        if(error){
          console.log(error.reason)
          Session.set('loadingSplash', false);
        } else {
          console.log('all good');
          Router.go('/people');
          Session.set('loadingSplash', false);
          return false;
            }
      });
      },


  });

Template.addHelper.helpers({
    isLoading: function () {
      return Session.get('loadingSplash');
    },

});

