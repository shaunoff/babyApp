import React, { Component } from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react';
import {browserHistory} from 'react-router';
/*const login = () => {
  const email = document.querySelector('[name="emailAddress"]').value;
  const password = document.querySelector('[name="password"]').value;

  Meteor.loginWithPassword(email, password, (error) => {
    if (error) {
      console.log(error.reason);
    } else {
    console.log('Logged In');

      const { location } = component.props;
      if (location.state && location.state.nextPathname) {
        browserHistory.push(location.state.nextPathname);
      } else {
        browserHistory.push('/');
      }
    }
  });
};*/

export default class Login extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    const email = document.querySelector('[name="emailAddress"]').value;
    const password = document.querySelector('[name="password"]').value;
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.log(error.reason);
      } else {
        console.log('Logged In');
        const { location } = this.props;
        if (location.state && location.state.nextPathname) {
          browserHistory.push(location.state.nextPathname);
        } else {
          browserHistory.push('/');
        }
      }
    })
  }
  render() {
      return (
        <main>
          <LoginButtons />
          <form ref={ form => (this.loginForm = form) } onSubmit={ this.handleSubmit.bind(this) }>
                    <input
                        type="email"
                        ref="emailAddress"
                        name="emailAddress"
                        placeholder="Email Address"
                      />
                      <input
                          type="password"
                          ref="password"
                          name="password"
                          placeholder="password"
                        />

                    <button type="submit" >Login</button>
                  </form>
        </main>

      )}
}
