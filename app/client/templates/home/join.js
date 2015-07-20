Template.join.events({
    'click #join' : function(e, t) {
      e.preventDefault();
      var email = t.find('#email').value
        , password = t.find('#password').value,
          username = t.find('#username').value;

        // Trim and validate the input

      Accounts.createUser({email: email, password : password, username: username}, function(err){
          if (err) {
            // Inform the user that account creation failed
            console.log(err);
            IonPopup.alert({
            title: 'Error',
            template: err.message,
            okText: 'Got It.'
            });
          } else {
            // Success. Account has been created and the user
            // has logged in successfully.
            // create default settings
            console.log("Account created");
            Router.go('/');
          }

        });

      return false;
    }
  });