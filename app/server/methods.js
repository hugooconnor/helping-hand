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


});
