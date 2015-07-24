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
    var obj1 = {};
    obj1[userRole] = userId;
    var obj2 = {};
    //can't fill obj2 until we have inviteeId

    if (Meteor.users.find({'emails.0.address': email}).fetch().length > 0){
        var inviteeId = Meteor.users.find({'emails.0.address': email}).fetch()[0]._id;
        //add the user to invitee roles
        obj2[inviteeRole] = inviteeId;
        Meteor.users.update({_id: userId}, {$addToSet: obj2});
        //add the invitee to users roles
        Meteor.users.update({_id: inviteeId}, {$addToSet: obj1});
        //send email to say what's going on
        Meteor.call('sendEmail',
                      email,
                      'no-reply@helpinghand.io',
                      subject,
                      body
                        );
    } else {
      //create new user
      var inviteeId = Accounts.createUser({email: email, password: 'password', username: email});
      //add the invitee to users roles
      obj2[inviteeRole] = inviteeId;
      Meteor.users.update({_id: userId}, {$addToSet: obj2});
      //add the invitee to users roles
      Meteor.users.update({_id: inviteeId}, {$addToSet: obj1});
      //send enrollment link in an email
      Accounts.sendEnrollmentEmail(inviteeId);
    }
  },

});
