Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://postmaster%40mg.helpinghand.io:password@smtp.mailgun.org:587';
  });

  Meteor.methods({
  sendEmail: function (to, subject, text) {
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    // don’t allow sending email unless the user is logged in
    if (!Meteor.user())
      throw new Meteor.Error(403, 'not logged in');

    // and here is where you can throttle the number of emails this user
    // is allowed to send per day

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
});