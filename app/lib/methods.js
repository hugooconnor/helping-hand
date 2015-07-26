/*****************************************************************************/
/* Customise Global Variables */
/*****************************************************************************/

Meteor.startup(function() {
  Accounts.urls.resetPassword = function (token) {
    return Meteor.absoluteUrl('reset/' + token);
  };

  Accounts.urls.enrollAccount = function (token) {
    return Meteor.absoluteUrl('enrol/' + token);
  };
});

/*****************************************************************************/
/* Client and Server Methods */
/*****************************************************************************/
Meteor.methods({

   clone: function (obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
   },

   updateEmail: function (email) {
      if(Meteor.users.find({ emails: { $elemMatch: { address: email } } }).fetch().length === 0){
         Meteor.users.update({_id:Meteor.user()._id}, {$set: {'emails.0.address': email}});
         IonPopup.alert({
            title: 'Alert',
            template: 'Email address updated to '+email,
            okText: 'Got It.'
            });
      } else {
         IonPopup.alert({
            title: 'Error',
            template: 'That email address is already in use.',
            okText: 'Got It.'
            });
      }
   },

   removeAlert: function (id) {
      return Alerts.remove(id);
   },

   test: function () {
      console.log("test working")
   },

// Validators, helpers

   trimInput: function (val) {
      return val.replace(/^\s*|\s*$/g, "");
   },

   isEmail: function (val) {
   if (val.indexOf('@') !== -1) {
      return true;
    } else {
      IonPopup.alert({
            title: 'Error',
            template: 'Please enter a valid email address.',
            okText: 'Got It.'
            });
      return false;
      }
   },

   isValidPassword: function (val) {
   if (val.length >= 6) {
      return true;
   } else {
    IonPopup.alert({
            title: 'Error',
            template: 'Error & Your password should be 6 characters or longer.',
            okText: 'Got It.'
            });
    return false;
         }
   },

   isNotEmpty: function (val) {
   // if null or empty, return false
   if (!val || val === ''){
    IonPopup.alert({
            title: 'Error',
            template: 'Error & Please fill in all required fields.',
            okText: 'Got It.'
            });
    return false;
      }
  return true;
      },

      //helpers, partners, helping
      addHelpers: function (helperId) {
         return Meteor.users.update({_id: Meteor.userId()}, {$addToSet: {helpers: helperId}});
      },

      addPartners: function (partnerId) {
         return Meteor.users.update({_id: Meteor.userId()}, {$addToSet: {partners: partnerId}});
      },

      addHelping: function (helpingId) {
         return Meteor.users.update({_id: Meteor.userId()}, {$addToSet: {helping: helpingId}});
      },

      addPartnered: function (partneredId) {
         return Meteor.users.update({_id: Meteor.userId()}, {$addToSet: {partnered: partneredId}});
      },

      getHelpers: function () {
         var helpers = Meteor.users.find(Meteor.userId()).fetch()[0].helpers;
         var helpersFull = [];
         for(i=0; i < helpers.length; i++){
            helpersFull.push(Meteor.users.find(helpers[i]).fetch()[0]);
         }
         return helpersFull;
      },

      updateUsername: function (id, username) {
        if (Meteor.users.findOne({username: username}) != null){
          IonPopup.alert({
            title: 'Error',
            template: 'That username is taken',
            okText: 'Got It.'
            });
          throw new Meteor.Error( 500, 'There was an error processing your request' );
        } else {
          return Meteor.users.update({_id: id}, {$set: {username: username}});
        }
      },

    

     
   });