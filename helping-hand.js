//Create Reports collection on 'meteor reset'
Reports = new Mongo.Collection("reports");

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
      return Reports.find({});
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
};
