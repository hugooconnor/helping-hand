//Create Reports collection on 'meteor reset'
Reports = new Mongo.Collection("reports");

//Create Settings collection on 'meteor reset'
Settings = new Mongo.Collection("settings");

//Create Settings collection on 'meteor reset'
Invites = new Mongo.Collection("invites");

//Create Settings collection on 'meteor reset'
Emails = new Mongo.Collection("emails");

//Confidence slider
xyz = function(event, ui){
          var confidence = $("#slider").slider("value");
          $("#confidence").text("My confidence in this report; "+confidence+"%");
        }

//All client javascript
if (Meteor.isClient) {

  //do jquery stuff once slider div is rendered
  Template.slider.onRendered(function () {
      $("#slider").slider({
        slide: xyz,
        change: xyz
      });

          $("#confidence").text("Select your degree of confidence (0-100);");

  });

  //Body helper functions
  Template.body.helpers({

    //return report data
    reports: function () {
      var start = new Date(Date.now()-14*24*60*60*1000);
      return Reports.find({ created: { $gt: start} } );
    },

    //return true if report(s)
    hasReport: function () {
      if (Reports.find({}).count() > 0){
        return true;
      } else {
        return false;
      }
    }

  });

  //Body event functions
  Template.body.events({

    //create a new report on submission
    "submit .new-report": function (event) {
        var text = event.target.text.value;
        var date = new Date();
        var helper = Meteor.userId();
        var helpee = 'hugo';
        var confidence = $("#slider").slider("value");

        Reports.insert({ 
            helper: helper,
            helpee: 'hugo',
            comment: text,
            confidence: confidence,
            created: date,

        });

        event.target.text.value = "";

        return false;
    },

  });

//report helper functions
Template.report.helpers({

    //Return user id or Anonymous
    lookupUserId: function (id) {
      if (id){
        return Meteor.users.findOne(id);
      } else {
        return 'Anonymous';
      }
    },

    //prettyDate: function (date) {
    //}

  });
};

//All server javascript
if (Meteor.isServer) {

Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://postmaster%40mg.helpinghand.io:password@smtp.mailgun.org:587';
  });

  Meteor.methods({
  sendEmail: function (to, subject, text) {
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
  }
});



};
