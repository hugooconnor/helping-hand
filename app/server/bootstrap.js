Meteor.startup(function () {
  //environment variable for email sending
  process.env.MAIL_URL = 'smtp://postmaster%40mg.helpinghand.io:password@smtp.mailgun.org:587';
});
