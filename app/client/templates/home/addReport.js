Template.addReport.events({
    'change .toggle [type="checkbox"]': function(e) {
                var checkbox = $(e.target);
                if (checkbox.is(':checked')) {
                        Session.set('anonymous', true);
                } else {
                        Session.set('anonymous', false);
                }
        },

    'click #report' : function(e, t){
      e.preventDefault();
      var health = t.find('#health').value;
      var message = t.find('#message').value;
      var date = new Date();
      //var anon = t.find('#anon').value;
      //console.log(anon);
      if (Session.get('anonymous')) {
        var helperId = null;
        var helper = 'anonymous';
      } else {
        var helperId = Meteor.userId();
        var helper = Meteor.user().username;
      }

      var helpeeId = Session.get('helpeeId');
      var helpee = Meteor.users.findOne(helpeeId).username;
      //check start health
      Meteor.call('getHealth', helpeeId, function (e, r) {
        if (e){
          console.log(e);
        } else {
          Session.set('startHealth', r);
        }
      });
      var startHealth = Session.get('startHealth');

      //change to server method and call
      Reports.insert({ 
            helperId: helperId,
            helpeeId: helpeeId,
            helpee: helpee,
            helper: helper,
            comment: message,
            health: health,
            created: date,
        });

      //check end health
      Meteor.call('getHealth', helpeeId, function (e, r) {
        if (e){
          console.log(e);
        } else {
          Session.set('endHealth', r);
        }
      });
      var endHealth = Session.get('endHealth');
        
      Meteor.call('checkAlert', helpeeId, startHealth, endHealth);
      Router.go('/people');
      return false;
      },


  });

Template.addReport.helpers({
  who: function () {
    var id = Session.get('helpeeId');
    return Meteor.users.findOne(id).username;
  },

})

