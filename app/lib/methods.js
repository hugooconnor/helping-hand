/*****************************************************************************/
/* Client and Server Methods */
/*****************************************************************************/
Meteor.methods({
   updateEmail: function (email) {
      if(Meteor.users.find({ emails: { $elemMatch: { address: email } } }).fetch().length === 0){
         Meteor.users.update({_id:Meteor.user()._id}, {$set: {'emails.0.address': email}});
      } else {
         IonPopup.alert({
            title: 'Error',
            template: 'That email address is already in use.',
            okText: 'Got It.'
            });
      }
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
   });
