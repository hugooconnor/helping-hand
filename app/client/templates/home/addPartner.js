//1. check if user is already in the system
//2. if not, create account
//3. send Accounts.sendEnrollmentEmail with the new id
//4. catch new user at enrol template

Template.addPartner.events({

    'click #invite' : function(e, t){
      e.preventDefault();
      //check data is valid

      var email = t.find('#email').value;
      var userId  = Meteor.userId();
      Session.set('loadingSplash', true);

      Meteor.call('inviteUser', email, 'subject', 'message', userId, 'partnered', 'partners', function(error, result){
      	if(error){
      		console.log(error.reason)
      		Session.set('loadingSplash', false);
      	} else {
      		Router.go('/people');
      		Session.set('loadingSplash', false);
      		return false;
      			}
      });
      },


  });

Template.addPartner.helpers({
    isLoading: function () {
      return Session.get('loadingSplash');
    },

});