Template.editHelpee.helpers({
	isPartner: function () {
		Meteor.call('checkPartner', Session.get('helpeeId'), Meteor.userId(), function (error, result) {
			if (error) {
				return false;
			} else {
				Session.set('isPartner', result);
			}
		});
		return Session.get('isPartner');
	},

	isTrue: function () {
		return true;
	},

	health: function () {
		Meteor.call('getHealth', Session.get('helpeeId'), function(error, result) {
			if(error){
				console.log(error.reason);
			} else {
				Session.set('health', result);
			}
		});
		return Session.get('health');
	},

	reports: function () {
      var start = new Date(Date.now()-14*24*60*60*1000);
      return Reports.find({helpeeId: Session.get('helpeeId'), created: { $gt: start}}, {"sort" : [['created', 'desc']]});
    },

    noReports: function () {
     var start = new Date(Date.now()-14*24*60*60*1000);
     return (Reports.find({helpeeId: Session.get('helpeeId'), created: { $gt: start}}, {"sort" : [['created', 'desc']]}).fetch().length == 0)
    }
});


Template.editHelpee.events({
	'click #delete': function(e, t){
      e.preventDefault();
      //remove helper from partnered role
      IonPopup.confirm({
      title: 'Are you sure?',
      template: 'Are you <strong>really</strong> sure you want to delete?',
      onOk: function() {
        Meteor.call('removeHelper', Session.get('helpeeId'), Meteor.userId(), function (error, result) {
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
