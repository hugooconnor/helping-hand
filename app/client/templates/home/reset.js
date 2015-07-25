// Validators, helpers
//

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

Template.reset.events({

    'click #reset-password' : function(e, t) {
      e.preventDefault();
      console.log('loading');
      Session.set('loading', true);
      var pw = t.find('#password').value;
      if (isNotEmpty(pw) && isValidPassword(pw)) {
        Accounts.resetPassword(Session.get('resetToken'), pw, function(err){
          if (err) {
            console.log(err.message);
            IonPopup.alert({
            title: 'Error',
            template: err.message,
            okText: 'Got It.'
            });
          }
          else {
            Router.go('/');
          }
          Session.set('loading', false);
        });
      }
    return false;
    }
});