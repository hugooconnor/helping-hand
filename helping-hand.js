Reports = new Mongo.Collection("reports");

if (Meteor.isClient) {

  Template.body.helpers({

    //lookupUserId: function (id) {
      //return Meteor.users.findOne(id);
    //},

    reports: function () {
      return Reports.find({});
    }

  });

  Template.body.events({
    "submit .new-report": function (event) {
        var text = event.target.text.value;
        var date = new Date();
        var helper = Meteor.userId();
        var helpee = 'hugo';
        var confidence = 100;

        Reports.insert({ 
            helper: helper,
            helpee: 'hugo',
            comment: text,
            confidence: confidence,
            created: date,

        });

        event.target.text.value = "";

        return false;
    }
  });

}
