Template.settings.events({
    'click #signout' : function(e, t){
      e.preventDefault();
      console.log("signout clicked.");
      Meteor.logout();
      Router.go('/');
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