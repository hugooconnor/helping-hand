Template.people.helpers({

//not working properly
  noHelpers: function () {
  	return (Meteor.user().helpers == null || Meteor.user().helpers.length == 0);
  },

  noPartners: function () {
  	return (Meteor.user().partners == null || Meteor.user().partners.length == 0);
  },

  noHelping: function () {
  	return (Meteor.user().helping == null && Meteor.user().partnered == null);
  },

  helpers: function () {
  	if (Meteor.user().helpers != null) {
  		var helpers = Meteor.users.find(Meteor.userId()).fetch()[0].helpers;
    	var helpersFull = [];
         for (i=0; i < helpers.length; i++){
            helpersFull.push(Meteor.users.find(helpers[i]).fetch()[0]);
         }
         return helpersFull;
  	}
  },

  partners: function () {
  	if (Meteor.user().partners != null) {
  		var partners = Meteor.users.find(Meteor.userId()).fetch()[0].partners;
    	var partnersFull = [];
         for (i=0; i < partners.length; i++){
            partnersFull.push(Meteor.users.find(partners[i]).fetch()[0]);
         }
         return partnersFull;
  	}
  },

  helping: function () {
  	if (Meteor.user().helping != null && Meteor.user().partnered != null){
  		var helping = Meteor.users.find(Meteor.userId()).fetch()[0].helping;
    	var partnered = Meteor.users.find(Meteor.userId()).fetch()[0].partnered;
    	var helpingFull = [];
         for (i=0; i < helping.length; i++){
            helpingFull.push(Meteor.users.find(helping[i]).fetch()[0]);
         }
         for (i=0; i < partnered.length; i++){
            helpingFull.push(Meteor.users.find(partnered[i]).fetch()[0]);
         }
         var helpingList = _.uniq(helpingFull, function(item, key, _id) { 
    			return item._id;
			});
         return helpingList;
  	} else if (Meteor.user().helping == null && Meteor.user().partnered != null){
  		var partnered = Meteor.users.find(Meteor.userId()).fetch()[0].partnered;
    	var helpingFull = [];
         for (i=0; i < partnered.length; i++){
            helpingFull.push(Meteor.users.find(partnered[i]).fetch()[0]);
         }
         return helpingFull;
  	} else if (Meteor.user().helping != null && Meteor.user().partnered == null) {
  		var helping = Meteor.users.find(Meteor.userId()).fetch()[0].helping;
    	var helpingFull = [];
         for (i=0; i < helping.length; i++){
            helpingFull.push(Meteor.users.find(helping[i]).fetch()[0]);
         }
         return helpingFull;
  	}
  },

});

  