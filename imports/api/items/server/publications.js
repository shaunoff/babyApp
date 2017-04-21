import { Meteor } from 'meteor/meteor';
import Items from '../items';

Meteor.publish('allItems', function() {
  return Items.find({}, {
    sort: { added: -1 }
  });
});
