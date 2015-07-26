Template.editHelpee.helpers({
	isPartner: function () {
		var helpee = Session.get('helpeeId');
		var helper = Meteor.userId();
		Meteor.call('checkPartner', helpee, helper, function (error, result) {
			if (error) {
				console.log('something went wrong');
			} else {
				return result;
			}
		});
	},

	isTrue: function () {
		return true;
	}
})