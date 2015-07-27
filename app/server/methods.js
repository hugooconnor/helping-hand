/*****************************************************************************/
/* Server Only Methods */
/*****************************************************************************/
Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    // don’t allow sending email unless the user is logged in
    //if (!Meteor.user())
      //throw new Meteor.Error(403, 'not logged in');
    // and here is where you can throttle the number of emails this user
    // is allowed to send per day
    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  },

  inviteUser: function (email, subject, body, userId, userRole, inviteeRole) {
    var obj1 = {};
    obj1[userRole] = userId;
    var obj2 = {};
    //can't fill obj2 until we have inviteeId

    if (Meteor.users.find({'emails.0.address': email}).fetch().length > 0){
        var inviteeId = Meteor.users.find({'emails.0.address': email}).fetch()[0]._id;
        //add the user to invitee roles
        obj2[inviteeRole] = inviteeId;
        Meteor.users.update({_id: userId}, {$addToSet: obj2});
        //add the invitee to users roles
        Meteor.users.update({_id: inviteeId}, {$addToSet: obj1});
        //send email to say what's going on
        Meteor.call('sendEmail',
                      email,
                      'no-reply@helpinghand.io',
                      subject,
                      body
                        );
    } else {
      //create new user
      var inviteeId = Accounts.createUser({email: email, password: 'password', username: email});
      //add the invitee to users roles
      obj2[inviteeRole] = inviteeId;
      Meteor.users.update({_id: userId}, {$addToSet: obj2});
      //add the invitee to users roles
      Meteor.users.update({_id: inviteeId}, {$addToSet: obj1});
      //send enrollment link in an email
      //hacked apart from sendEnrollmentEmail
      var user = Meteor.users.findOne(inviteeId);
      var token = Random.secret();
      var when = new Date();
      var tokenRecord = {
        token: token,
        email: email,
        when: when
      };
      Meteor.users.update(inviteeId, {$set: {
        "services.password.reset": tokenRecord
      }});

      // before passing to template, update user object with new token
      Meteor._ensure(user, 'services', 'password').reset = tokenRecord;

      var enrollAccountUrl = Accounts.urls.enrollAccount(token);
      console.log(enrollAccountUrl); 

      body += ' Follow this link to create your acount: '+enrollAccountUrl

      Meteor.call('sendEmail',
                      email,
                      'no-reply@helpinghand.io',
                      subject,
                      body
                        );

    }
  },

  checkPartner: function (helpee, helper) {
      if (Meteor.users.findOne(helpee).partners != null) {
        var isPartner = false;
        var partners = Meteor.users.findOne(helpee).partners;
        for (var i = 0; i < partners.length; i++){
          if (partners[i] == helper) {
            isPartner = true;
          }
        }
      return isPartner;

    } else {
      return false;
    }
    
  },

  getHealth: function(id){
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

});
