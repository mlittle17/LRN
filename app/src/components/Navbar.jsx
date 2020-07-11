import React, { useState } from 'react';
import {
  Link, Switch, Route,
} from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';

import Home from './Home.jsx';
import Profile from './Profile.jsx';
import Sessions from './Sessions.jsx';
import Logout from './Logout.jsx';

import 'semantic-ui-css/semantic.min.css';
import logo from '../styles/images/logo.png';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (e, { name }) => setActiveItem(name);

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
        </Switch>
      </div>
    </div>
  );
};

export default Navbar;
