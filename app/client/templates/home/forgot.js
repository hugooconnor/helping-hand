// Trim Input
function trimInput(val) {
  return val.replace(/^\s*|\s*$/g, "");
}

// Validations
function isEmail(val) {
  if (val.indexOf('@') !== -1) {
      return true;
    } else {
      IonPopup.alert({
            title: 'Error',
            template: 'Error & Please enter a valid email address.',
            okText: 'Got It.'
            });
      return false;
    }
}

function isValidPassword(val) {
  if (val.length >= 6) {
    return true;
  } else {
    IonPopup.alert({
            title: 'Error',
            template: 'Error & Your password should be 6 characters or longer.',
            okText: 'Got It.'
            });
    return false;
  }
}

function isNotEmpty(val) {
  // if null or empty, return false
  if (!val || val === ''){
    IonPopup.alert({
            title: 'Error',
            template: 'Error & Please fill in all required fields.',
            okText: 'Got It.'
            });
    return false;
  }
  return true;
}

Template.forgot.events({

  'click #reset-form' : function(e, t) {
      e.preventDefault();
      console.log('loading');
      Session.set('loadingSplash', true);
      var email = trimInput(t.find('#email').value);
      if (isNotEmpty(email) && isEmail(email)) {  
        Accounts.forgotPassword({email: email}, function(err){
        if (err){
          Session.set('loadingSplash', false);
            console.log('error')
            IonPopup.alert({
            title: 'Error',
            template: err.message,
            okText: 'Got It.'
            });
        } 
        else {
          Session.set('loadingSplash', false);
            IonPopup.alert({
            title: 'Alert',
            template: 'Check your email for a password reset link',
            okText: 'Got It.'
            });
          Router.go('/');
        }
      });
      }
      return false;
    },

});

Template.forgot.helpers({
    isLoading: function () {
      return Session.get('loadingSplash');
    },

});