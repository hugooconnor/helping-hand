/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */

Meteor.publish("homeReports", function () {
	var start = new Date(Date.now()-14*24*60*60*1000);
    return Reports.find({helpeeId: this.userId, created: { $gt: start}}, {"sort" : [['created', 'desc']]});
});

Meteor.publish("currentUser", function () {
	return Meteor.users.find(this.userId, {
		fields: {
			"username": 1, 
			"emails": 1, 
			"partners": 1, 
			"helpers": 1, 
			"helping": 1, 
			"partnered": 1
		}
	});
});

Meteor.publish("relatedUsers", function() {
	var user = Meteor.users.findOne(this.userId);

	var partnered = [];
	if (user.partnered) {
		partnered = user.partnered;
	}
	var partners = [];
	if (user.partners) {
		partners = user.partners;
	}
	var helpers = [];
	if (user.helpers) {
		helpers = user.helpers;
	}
	var helping = [];
	if (user.helping) {
		helping = user.helping;
	}

	var userIds = partnered
					.concat(partners)
					.concat(helpers)
					.concat(helping);

	userIds = _.uniq(userIds);

	return Meteor.users.find({
		"_id" : { $in: userIds }
	}, {
		fields: {
			username: 1
		}
	});
})

Meteor.publish("alerts", function () {
	return Alerts.find({helpee: this.userId});
});


Meteor.publish("helpeeView", function (helpeeId) {
		var start = new Date(Date.now()-14*24*60*60*1000);
      return Reports.find({helpeeId: helpeeId, created: { $gt: start}}, {"sort" : [['created', 'desc']]});
});

