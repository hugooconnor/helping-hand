Template.settings.events({
    'click #signout' : function(e, t){
      e.preventDefault();
      console.log("signout clicked.");
      Meteor.logout();
      Router.go('/');
      },

    //todo: hookup to checkboxes
    // Set filter option when toggles are changed
    'change .toggle [type="checkbox"]': function(e) {
        var checkbox = $(e.target);

        if (checkbox.is(':checked')) {
            console.log("checked");
        } else {
            console.log("unchecked");
        }
    },
  });


Template.settings.helpers({
  alerts: function () {
      return Alerts.find({helpee: Meteor.user().username});
    },

  hasAlerts: function () {
    if (Alerts.find({helpee: Meteor.user().username}).fetch().length > 0){
        return true;
    } else {
        return false;
    }
  },

  reportsVisible: function () {
    if(true){
        return "checked";
    } else {
        return "";
    }
  },

  profileDiscoverable: function () {
    if(true){
        return "checked";
    } else {
        return "";
    }
  },

});