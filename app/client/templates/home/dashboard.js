Template.dashboard.events({
    'click #signout' : function(e, t){
      e.preventDefault();
      console.log("signout clicked.");
      Meteor.logout();
      },

  });

Template.dashboard.helpers({
  reports: function () {
      var start = new Date(Date.now()-14*24*60*60*1000);
      return Reports.find({helpeeId: Meteor.userId(), created: { $gt: start}}, {"sort" : [['created', 'desc']]});
    },

  noReports: function () {
    var start = new Date(Date.now()-14*24*60*60*1000);
    return (Reports.find({helpeeId: Meteor.userId(), created: { $gt: start}}, {"sort" : [['created', 'desc']]}).fetch().length == 0);
  },

  //add health calculation here.
  //
  health: function () {
    var id = Meteor.userId();
    var start = new Date(Date.now()-14*24*60*60*1000);
    var reports = Reports.find({helpeeId: id, created: { $gt: start}}).fetch(); 
    var health = 100;
    var weighting = 0;
    if(reports.length == 0){
      health = 100;      
      return health;
    } else {
      for (var i=0; i< reports.length; i++) {
      //todo: add health as function of time.
      var days = new Date(Date.now() - reports[i].created).getTime();
      var weight = 1 - Math.pow(parseFloat(days)/parseFloat(14*24*60*60*1000), 2);
      weighting += weight;
      health += parseInt(reports[i].health)*weight;
      }
    return (health/(weighting+1)).toFixed(2);
    }
  },


  hearts: function(n) {
    if(n < 100 && n >= 80)
      return "<i class='icon ion-heart></i>";
  },

  who: function () {
    return Meteor.user().username;
  },



});