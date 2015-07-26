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
	}
})