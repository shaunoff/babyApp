import { Meteor } from 'meteor/meteor';
import { Slingshot } from 'meteor/edgee:slingshot';
import Items from '../../api/items/items';

Slingshot.fileRestrictions('Uploader', {
  allowedFileTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/svg', 'image/gif', 'image/svg+xml'],
  maxSize: 100 * 1024 * 1024, // 1MB limit (use null for unlimited)
});

Slingshot.createDirective('Uploader', Slingshot.S3Storage, {

  bucket: 'hutchbaby',
  acl: 'public-read',
  region: 'us-east-1', // for example, us-west-2
  authorize() {

    if (!this.userId) throw new Meteor.Error('need-login', 'You need to be logged in to upload files!');
    const userFileCount = Items.find({ userId: this.userId }).count();
    return userFileCount < 300;

  },
  key(file) {
    return `${this.userId}/${file.name}`;
  },
});
