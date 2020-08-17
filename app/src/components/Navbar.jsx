import React, { useState } from 'react';
import {
  Link, Switch, Route,
} from 'react-router-dom';

import { v1 as uuid } from 'uuid';
import { Menu, Image } from 'semantic-ui-react';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import Sessions from './Sessions.jsx';
import Logout from './Logout.jsx';
import FindSessions from './FindSessions.jsx';
import CreateSession from './CreateSession.jsx';
import InstructorSession from './InstructorSession.jsx';
import StudentSession from './StudentSession.jsx';
import NotLoggedIn from './NotLoggedIn.jsx';

import 'semantic-ui-css/semantic.min.css';
import logo from '../styles/images/logo.png';

const Navbar = ({
  user, googleLogin, googleLogout, binder, sessions, regSessions, notes,
}) => {
  const [activeItem, setActiveItem] = useState('home');
  const [navBarSessionName, setNavbarSessionName] = useState('');

  const handleItemClick = (e, { name }) => setActiveItem(name);
  const id = uuid();
  // console.log(user.id, 'NAVBAR');
  return (
    <div>
      <Menu pointing secondary size="massive" style={{ backgroundColor: '#2d2e2e' }}>
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={handleItemClick}
        >
          <Link to="/">
            <Image src={logo} size="tiny" alt="LRN logo" />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right" class="right menu">
          <Menu.Item
            name="student"
            active={activeItem === 'student'}
            onClick={handleItemClick}
          >
            <Link to={`/student/${id}`} class="item" style={{ color: '#a58e57', fontSize: '24px' }}>Student</Link>
          </Menu.Item>
          <Menu.Item
            name="profile"
            active={activeItem === 'profile'}
            onClick={handleItemClick}
          >
            <Link to="/sessions" class="item" style={{ color: '#a58e57', fontSize: '24px' }}>Sessions</Link>
          </Menu.Item>
          <Menu.Item
            name="sessions"
            active={activeItem === 'sessions'}
            onClick={handleItemClick}
          >
            <Link to="/profile" class="item" style={{ color: '#a58e57', fontSize: '24px' }}>Profile</Link>
          </Menu.Item>

          {user
            ? (
              <Menu.Menu position="right" class="right menu">
                <Menu.Item
                  name="login"
                  active={activeItem === 'logout'}
                  onClick={googleLogout}
                >
                  <Link to="/logout" class="item" style={{ color: '#a58e57', fontSize: '24px' }}>Logout</Link>
                </Menu.Item>
              </Menu.Menu>
            )
            : (
              <Menu.Menu position="right" class="right menu">
                <Menu.Item
                  name="login"
                  active={activeItem === 'login'}
                  onClick={googleLogin}
                >
                  <Link to="/logout" class="item" style={{ color: '#a58e57', fontSize: '24px' }}>Login</Link>
                </Menu.Item>
              </Menu.Menu>
            )}
        </Menu.Menu>
      </Menu>
      <div>
        <Switch>
          {!user && <Route exact path="/" render={() => (<NotLoggedIn />)} />}
          {user && <Route exact path="/" render={() => (<Home user={user} binder={binder} sessions={sessions} regSessions={regSessions} setNavbarSessionName={setNavbarSessionName} />)} />}
          <Route exact path="/profile" render={() => (<Profile user={user} binder={binder} />)} />
          <Route exact path="/sessions" component={Sessions} />
          <Route exact path="/find" render={() => (<FindSessions user={user} sessions={sessions} regSessions={regSessions}/>)} />
          <Route exact path="/create" render={() => (<CreateSession user={user} />)} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/registered" component={Sessions} />
          <Route path="/instructor/:roomID" render={(props) => (<InstructorSession {...props} user={user} sessionName={navBarSessionName} />)} />
          <Route path="/student/:roomID" render={(props) => (<StudentSession {...props} user={user} notes={notes} sessionName={navBarSessionName} />)} />
        </Switch>
      </div>
    </div>
  );
};
export default Navbar;