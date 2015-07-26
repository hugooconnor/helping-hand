Template.editHelper.helpers({
	reports: function () {
		var helperId = Session.get('helperId');
		var helpeeId = Meteor.userId();
		return Reports.find({helperId: helperId, helpeeId: helpeeId});
	},

  noReports: function () {
    var helperId = Session.get('helperId');
    var helpeeId = Meteor.userId();
    return (Reports.find({helperId: helperId, helpeeId: helpeeId}).fetch().length == 0);
  }
})

Template.editHelper.events({
	'click #delete': function(e, t){
      e.preventDefault();
      //remove helper from partnered role
      IonPopup.confirm({
      title: 'Are you sure?',
      template: 'Are you <strong>really</strong> sure you want to delete this helper?',
      onOk: function() {
        Meteor.call('removeHelper', Meteor.userId(), Session.get('helperId'), function (error, result) {
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