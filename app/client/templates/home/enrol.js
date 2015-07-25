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

Template.enrol.events({
'click #createAccount' : function(e, t) {
      e.preventDefault();
      var pw = t.find('#password').value;
      var username = t.find('#username').value;
      if (isNotEmpty(pw) && isValidPassword(pw)) {
        Session.set('loading', true);
        Accounts.resetPassword(Session.get('enrolToken'), pw, function(err){
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
            //simple fix for unique usernames
            if (Meteor.users.find({username: username}) != null) {
              username+="1";
              IonPopup.alert({
              title: 'Allert',
              template: 'Your username is '+username,
              okText: 'Got It.'
            });
            }
            //not updating properly
            Meteor.call('updateUsername', Meteor.userId(), username);
          }
          Session.set('loading', false);
        });
      }
    return false;
    }

  });