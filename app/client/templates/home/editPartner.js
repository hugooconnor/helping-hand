Template.editPartner.helpers({
	reports: function () {
		var partnerId = Session.get('partnerId');
		var helpeeId = Meteor.userId();
		return Reports.find({helperId: partnerId, helpeeId: helpeeId});
	}
})

Template.editPartner.events({
	'click #delete': function(e, t){
      e.preventDefault();
      //remove helper from partnered role
      IonPopup.confirm({
      title: 'Are you sure?',
      template: 'Are you <strong>really</strong> sure you want to delete this partner?',
      onOk: function() {
        Meteor.call('removeHelper', Meteor.userId(), Session.get('partnerId'), function (error, result) {
      		  if(error){
      			console.log(error.reason);
      			} else {
      			console.log(result);
      			}
      		});
      		IonPopup.close();
      		Router.go('/people');
      },
      onCancel: function() {
        IonPopup.close();
      }
    });
      
    },
})