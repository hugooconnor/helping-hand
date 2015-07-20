Template.editAlert.events({
        
    'click #delete-alert': function(e, t){
        e.preventDefault();
        var id = this._id;
        IonPopup.confirm({
            title: 'Are you sure?',
            template: 'Are you <strong>sure</strong> you want to delete this?',
      onOk: function() {
        Meteor.call('removeAlert', id);
        Router.go('settings');
      },
      onCancel: function() {
        console.log('Cancelled');
      }
    });
        
        },

    'click #save-alert': function(e, t){
        e.preventDefault();
        console.log("clicked save!");
    }
});