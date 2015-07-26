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

