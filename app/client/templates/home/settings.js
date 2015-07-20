Template.settings.events({
    'click #signout' : function(e, t){
      e.preventDefault();
      console.log("signout clicked.");
      Meteor.logout();
      Router.go('/');
      },

    //todo: hookup to checkboxes
    // Set filter option when toggles are changed
    'change #filterForm .toggle [type="checkbox"]': function(e) {
        var checkbox = $(e.target);
        var sessionName = 'filter_' + checkbox.attr('name');

        if (checkbox.is(':checked')) {
            Session.setPersistent(sessionName, true);
        } else {
            Session.setPersistent(sessionName, false);
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
  }
});