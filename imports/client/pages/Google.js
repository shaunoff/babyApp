import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data'

class Google extends React.Component {
  shouldComponentUpdate(){
    if (!Meteor.loggingIn() && !Meteor.userId()){
      setTimeout(function(){
        Meteor.loginWithGoogle({
          requestPermissions: ['email']
        });
      }, 600);
      return false
    }
    if (Meteor.userId()){
      console.log('Logged In');
      const { location } = this.props;
      console.log(location)
      if (location.state && location.state.nextPathname) {
        browserHistory.push(location.state.nextPathname);
      } else {
        browserHistory.push('/');
      }
      return true
    }

  }
  render() {
    console.log(this.props.googleQuery)
    if  (!this.props.googleQuery)  {
      return <div>loading</div>
    }
    if (this.props.googleQuery)  {
      return null
    }
  }
}



export default createContainer(()=>{
  return {
    googleQuery: Accounts.loginServicesConfigured()
  }
}, Google);
