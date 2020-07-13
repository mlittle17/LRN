import React, { useState } from 'react';
import {
  Link, Switch, Route,
} from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';
import { v1 as uuid } from 'uuid';

import Home from './Home.jsx';
import Profile from './Profile.jsx';
import Sessions from './Sessions.jsx';
import Logout from './Logout.jsx';
import CreateSession from './CreateSession.jsx';
import CreateRoom from '../routes/CreateRoom';
import Room from './Room.jsx';

import 'semantic-ui-css/semantic.min.css';
import logo from '../styles/images/logo.png';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const id = uuid();

  return (
    <div>

      <Menu pointing secondary>
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={handleItemClick}
        >
          <Link to="/">
            <Image src={logo} size="mini" alt="LRN logo" />
          </Link>
        </Menu.Item>

        <Menu.Item
          name="sessions"
          active={activeItem === 'sessions'}
          onClick={handleItemClick}
        >
          <Link to="/profile" class="item">Profile</Link>
        </Menu.Item>

        <Menu.Item
          name="profile"
          active={activeItem === 'profile'}
          onClick={handleItemClick}
        >
          <Link to="/sessions" class="item">Sessions</Link>
        </Menu.Item>

        <Menu.Menu position="right" class="right menu">
          <Menu.Item
            name="logout"
            active={activeItem === 'logout'}
            onClick={handleItemClick}
          >
            <Link to="/logout" class="item">Logout</Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/sessions" component={Sessions} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/create" component={CreateSession} />
          <Route exact path="/registered" component={Sessions} />
          <Route path="/room/:roomID" component={Room} />
          <Route exact path="/create" component={CreateSession} />
        </Switch>
      </div>
    </div>
  );
};

export default Navbar;
