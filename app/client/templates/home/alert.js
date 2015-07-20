Template.alert.helpers({
    alertURL: function () {
        return '/alerts/'+this._id;
    }
});

Template.alert.events({
    'click #delete': function(e, t){
      e.preventDefault();
      Alerts.remove(this._id);
    },
});