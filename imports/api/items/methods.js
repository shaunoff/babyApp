import s3PublicUrl from 'node-s3-public-url';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Items from './items';
import S3 from '../../modules/server/s3';


Meteor.methods({
  'get.items': function getItems(limit) {
    const user = Meteor.user()
    return Items.find({tagged: {$in: user.following}}, {
      sort: { added: -1 },
      limit: limit }).fetch();
  },
  'get.followedBy': function getFollowedBy() {
    return Meteor.users.find({following: Meteor.userId()}).fetch();
  },
  'changeFollowers': function addLikeMethod(userId, follow) {
    const currentUser = Meteor.user()
    let following = currentUser.following
    following ? '' : following = []

    if (follow == true){
      following.push(userId)
    }
    if (follow == false){
      const index = following.indexOf(userId);
      following.splice(index, 1);
    }

    console.log(following,this.userId)
    Meteor.users.update({_id: this.userId},
    {$set:{
        'following': following
      }

    });

  },
  'native.addLike': function addLikeMethod(data) {
    data.likes ? "" : data.likes = []
    const likesObject = {}

    likesObject.user = this.userId
    likesObject.added = new Date()
    data.likes.push(likesObject)
    Items.update({_id: data._id},
    {$set:{
        'likes': data.likes
      }
      //need finishing
    });

  },
  'native.addComment': function addCommentMethod(data, comment) {
    data.comments ? "" : data.comments = []
    const commentObject = {}
    commentObject.comment = comment
    commentObject.user = this.userId
    commentObject.added = new Date()
    data.comments.push(commentObject)
    Items.update({_id: data._id},
    {$set:{
        'comments': data.comments
      }
      //need finishing
    });

  },
  'files.store': function filesStoreMethod(file) {
    console.log(file)
    check(file, Object);
    const user = Meteor.users.findOne(this.userId);
    const email = 'shutch@p3i-inc.com'
    const sanitizedUrl =
    file.url.replace(email, `${encodeURIComponent(email)}`)
    .replace(file.name, `${s3PublicUrl(file.name)}`);
    return Items.insert({ userId: this.userId, url: sanitizedUrl, fileName: file.name, added: new Date(),comments: [],likes:[]});
  },

  'native.files.store': function filesStoreMethod(file,location,tagged) {
    const userId = this.userId;


    return Items.insert({ userId: userId, url: file.location, fileName: file.location.split('/').pop(), location: location,added: new Date(),comments:[],likes:[],tagged: tagged});
  },
  'native.avatar': function filesStoreMethod(file,location) {
    const userId = this.userId;


    return Meteor.users.update({_id: userId},
      {$set:{
          'url': file.location,
          'fileName': file.location.split('/').pop(),
        }
      });
  },
  'files.delete': function filesStoreMethod(fileId) {
    check(fileId, String);
    const file = Files.findOne(fileId);
    const user = Meteor.users.findOne(this.userId, { fields: { emails: 1 } });
    file.emailAddress = user.emails[0].address;
    if (file && file.userId === this.userId) {
      return S3.deleteFile(file, () => {
        Files.remove({ _id: fileId, userId: this.userId });
      });
    }

    throw new Meteor.Error('500', 'Must be logged in to do that!');
  },
});
