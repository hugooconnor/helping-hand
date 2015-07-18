//do somethings

Template.join.events({

    'click #login' : function(e, t){
      e.preventDefault();
      Session.set("currentId", "login");
      return false;
        },

      'click #join' : function(e, t){
      e.preventDefault();
      Session.set("currentId", "join");
      return false; 
      },

      'click #reset' : function(e, t){
      e.preventDefault();
      Session.set("currentId", "reset");
      return false; 
      }
  });