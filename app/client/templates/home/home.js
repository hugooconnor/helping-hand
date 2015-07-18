/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.home.events({
    'click #signout' : function(e, t){
      e.preventDefault();
      console.log("signout clicked.");
      Meteor.logout();
      },
});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.home.helpers({
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.home.created = function () {
};

Template.home.rendered = function () {
};

Template.home.destroyed = function () {
};
