import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'addNotificationId': function addNotificationId(device) {
    Meteor.users.update({_id: this.userId},
    {$set:{
        'pushNotifications': device
      }

    });
    return "success"

  },
  'notifications.test': function notTest(){
    const user = Meteor.user()
    const fullName = `${user.profile.firstName} ${user.profile.lastName}`
    var sendNotification = function(data) {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic N2NkOWY0MDgtNmMwMC00ZTMxLWI0NmQtYWU0Y2NmMDE4NzYz"
    };
    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };

    var https = require('https');
    var req = https.request(options, function(res) {
      res.on('data', function(data) {
        console.log("Response:");
        console.log(JSON.parse(data));
      });
    });

    req.on('error', function(e) {
      console.log("ERROR:");
      console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
    };
    var content = `${fullName} has just submitted a picture.`
    var message = {
      app_id: "802a7671-c8b5-4421-b72a-16db1d7d4083",
      contents: {"en": content},
      headings: {"en": "New Image Posted"},
      included_segments: ["Following TEst"]
    };

sendNotification(message);
  },
});
