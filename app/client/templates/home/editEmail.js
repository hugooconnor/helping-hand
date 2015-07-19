Template.editEmail.helpers({
    getEmail: function(){
        return Meteor.user().emails[0].address;
    }
});

Template.editEmail.events({
    'click #edit-email': function(e, t){
        e.preventDefault();
        var email = t.find('#email').value;
        Meteor.call('updateEmail', email); 
    }
})