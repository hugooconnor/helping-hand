Reports = new Mongo.Collection("report")

if (Meteor.isClient) {

  Template.body.helpers({
    reports: function () {
      return Reports.find({});
    }
  });

  Template.body.events({
    "submit .new-report": function (event) {
        var text = event.target.text.value;

        Reports.insert({
            comment: text
        });

        event.target.text.value = "";

        return false;
    }
  });

}
