import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Items = new Mongo.Collection('items');


Items.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Items.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

/*const ItemSchema = new SimpleSchema({
  userId: {
    type: String,
    label: 'The ID of the owner of this file.',
  },
  url: {
    type: String,
    label: 'The Amazon S3 URL for this file.',
  },
  fileName: {
    type: String,
    label: 'The original name for this file.',
  },
  comments: {
    type: Array,
    label: "comments array,"
  },
  added: {
    type: Date,
    label: 'date added',
  }
});



Items.attachSchema(ItemSchema);*/
export default Items;
