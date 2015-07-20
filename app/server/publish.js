/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */
Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'helping': 1, 'partnered': 1, 'helpers': 1, 'partners': 1}});
  } else {
    this.ready();
  }
});