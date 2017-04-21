import React from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const MainLayout = ({children}) =>
  <div className='main-layout'>
    <header>
      <h1><Link to='/'>Application</Link></h1>
      <div onClick={ handleLogout }>Logout</div>
      <nav>
        <Link to='/test'>test</Link>
      </nav>
    </header>
    {children}
  </div>

export default MainLayout;
