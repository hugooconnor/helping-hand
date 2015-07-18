Meteor.call("methodName", function (error) {
  // identify the error
  if (error.error === "create-failed") {
    // show a nice error message
    Session.set("errorMessage", "Please log in to post a comment.");
  }
});