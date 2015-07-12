Template.index.helpers({
   setloginID: function (){
    return Session.set("currentId", "login");
   },
   loginID: function () {
    return Session.equals('currentId', 'login');
   }, 
   joinID: function () {
    return Session.equals('currentId', 'join');
   },
   resetID: function () {
    return Session.equals('currentId', 'reset');
   } 
});