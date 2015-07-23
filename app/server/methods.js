/*****************************************************************************/
/* Server Only Methods */
/*****************************************************************************/
Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    // don’t allow sending email unless the user is logged in
    //if (!Meteor.user())
      //throw new Meteor.Error(403, 'not logged in');
    // and here is where you can throttle the number of emails this user
    // is allowed to send per day
    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  },

  inviteUser: function (email, subject, body, userId, userRole, inviteeRole) {
    if (Meteor.users.find({'emails.0.address': email}).fetch().length == 1){
        var inviteeId = Meteor.users.find({'emails.0.address': email}).fetch()._id;
        //add the user to invitee roles
        Meteor.users.update({});
        //add the invitee to users roles
        Meteor.users.update({});
        //send email to say what's going on
        Meteor.call('sendEmail',
                      email,
                      Meteor.find(userId).fetch().emails[0].address,
                      subject,
                      body
                        );
    } else {
      //create new user
      var invitedId = Accounts.createUser({email: email});
      //add the user to invitee roles
      //add the invitee to users roles
      //send enrollment link in an email
    }
  },


});
