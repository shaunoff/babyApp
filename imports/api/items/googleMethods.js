import { Meteor } from 'meteor/meteor';
import geocoder from 'geocoder'


const callService = (location) => new Promise((resolve, reject) => {
  const {longitude, latitude} = location
  geocoder.reverseGeocode( latitude, longitude, (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
});


Meteor.methods({

  location(location) {
    return callService(location)
    .then((result) => {

      return result.results[2].formatted_address
    })
    .catch((error) => {
      return error;
    });
  }
});
