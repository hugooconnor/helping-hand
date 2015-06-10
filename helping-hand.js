Reports = new Mongo.Collection("reports");

xyz = function(event, ui){
          var confidence = $("#slider").slider("value");
          $("#confidence").text("My confidence in this report: "+confidence+"%");
        }

if (Meteor.isClient) {

  Template.slider.onRendered(function () {
      $("#slider").slider({
        slide: xyz,
        change: xyz
      });

          $("#confidence").text("Select your degree of confidence");

  });

  Template.body.helpers({

    //lookupUserId: function (id) {
      //return Meteor.users.findOne(id);
    //},

    reports: function () {
      return Reports.find({});
    },

    hasReport: function () {
      if (Reports.find({}).count() > 0){
        return true;
      } else {
        return false;
      }
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

Template.report.helpers({

    lookupUserId: function (id) {
      if (id){
        return Meteor.users.findOne(id);
      } else {
        return 'Anonymous';
      }
      
    },

  });

}
