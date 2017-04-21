import { Meteor } from 'meteor/meteor';

Meteor.publish('allUsers', function() {
    const userId = this.userId
    if (userId){
      return Meteor.users.find();
    }



});
