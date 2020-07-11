import React, { useState } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';
import { v1 as uuid } from 'uuid';

import Home from './Home.jsx';
import Profile from './Profile.jsx';
import Sessions from './Sessions.jsx';
import Logout from './Logout.jsx';
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
          <NavLink to="/">
            <Image src={logo} size="mini" alt="LRN logo" />
          </NavLink>
        </Menu.Item>

        <Menu.Item
          name="sessions"
          active={activeItem === 'sessions'}
          onClick={handleItemClick}
        >
          <NavLink to="/profile" class="item">Profile</NavLink>
        </Menu.Item>

        <Menu.Item
          name="profile"
          active={activeItem === 'profile'}
          onClick={handleItemClick}
        >
          <NavLink to="/sessions" class="item">Sessions</NavLink>
        </Menu.Item>

        <Menu.Item
          name="room"
          active={activeItem === 'room'}
          onClick={handleItemClick}
        >
          <NavLink to={`/room/${id}`} class="item">Room</NavLink>
        </Menu.Item>

        <Menu.Menu position="right" class="right menu">
          <Menu.Item
            name="logout"
            active={activeItem === 'logout'}
            onClick={handleItemClick}
          >
            <NavLink to="/logout" class="item">Logout</NavLink>
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/sessions" component={Sessions} />
          <Route exact path="/logout" component={Logout} />
          <Route path="/room/:roomID" component={Room} />
        </Switch>
      </div>
    </div>
  );
};

export default Navbar;
