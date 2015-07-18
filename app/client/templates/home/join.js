Template.join.events({
    'click #join' : function(e, t) {
      e.preventDefault();
      var email = t.find('#email').value
        , password = t.find('#password').value,
          username = t.find('#username').value;

        // Trim and validate the input
      console.log("clicked");

      Accounts.createUser({email: email, password : password, username: username}, function(err){
          if (err) {
            // Inform the user that account creation failed
            console.log(err);
          } else {
            // Success. Account has been created and the user
            // has logged in successfully. 
            console.log("Account created");
            Router.go('/');
          }

        });

      return false;
    }
  });