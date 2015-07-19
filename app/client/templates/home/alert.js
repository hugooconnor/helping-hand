Template.alert.helpers({
});

Template.alert.events({
    'click #delete': function(e, t){
      e.preventDefault();
      Alerts.remove(this._id);
    },
});