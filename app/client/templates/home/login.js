Template.login.events({

    'click #login' : function(e, t){
      e.preventDefault();
      Session.set("currentId", "login");
      // retrieve the input field values
      var username = t.find('#username').value
        , password = t.find('#password').value;

        console.log("clicked "+username+" "+password);

        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(username, password, function(err){
        if (err){
            // The user might not have been found, or their passwword
          // could be incorrect. Inform the user that their
          // login attempt has failed. 
            console.log(err.message);
            IonPopup.alert({
            title: 'Error',
            template: err.message,
            okText: 'Got It.'
            });
        }
          
        else {
        // The user has been logged in.
            console.log('success!')
            Router.go('/');
        }
          
      });
         return false; 
      },
  });