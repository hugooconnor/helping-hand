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
      var subject = t.find('#alert-subject').value;
      var health = t.find('#health').value;
      var body = t.find('#alert-message').value;
      var date = new Date();
      var id = this._id;
      //var anon = t.find('#anon').value;
      //console.log(anon);

      //change to server method
      Alerts.update(id, {$set: {
            helpee: Meteor.userId(),
            notify: Meteor.userId(),
            subject: subject,
            body: body,
            health: health,
            created: date,
      }});

      IonPopup.alert({
            title: 'Alert',
            template: 'Alert email updated!',
            okText: 'Got It.'
            });


        Router.go('settings');
        return false;
      },
});