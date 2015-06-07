Reports = new Mongo.Collection("reports");

if (Meteor.isClient) {

  Template.slider.onRendered(function () {
      $("#slider").slider({
        change: function(event, ui){
          var confidence = $("#slider").slider("value");
          $("#confidence").text("My confidence in this report: "+confidence+"%");
        }
      });

          $("#confidence").text("Select your degree of confidence");

  });

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

}
