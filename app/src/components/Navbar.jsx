// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   HashRouter as Router,
//   Switch,
//   Route,
//   NavLink,
//   Link,
//   Redirect,
// } from 'react-router-dom';
// import Home from './Home.jsx';
// import Profile from './Profile.jsx';
// import Login from './Login.jsx';
// import SignUp from './SignUp.jsx';
// import PrivateRoute from './PrivateRoute.jsx';

// import {
//   // getMovementsLeading,
//   // getMovementsFollowing,
//   logout,
// } from '../services/services';

// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const [currentClass, setCurrentClass] = useState({});
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isNewUser, setIsNewUser] = useState(false);

//   // prevents issues with user id when no user is logged in
//   const userId = user ? user.id : null;

//   // function handleMovementTitleClick(movementId) {
//   //   axios.get(`/movement/:${movementId}`)
//   //     .then(res => {
//   //       setCurrentMovement(res.data);
//   //     })
//   //     .catch(err => {
//   //       console.error(err);
//   //     });
//   // }

//   const handleLogout = () => {
//     logout()
//       .then(() => {
//         setUser(null);
//         setIsAuthenticated(false);
//       })
//       .catch(err => console.error(err));
//   };

//   return (
//     <Router>
//       <div>
//         <nav className="flex items-center justify-between flex-wrap bg-gray-900 p-6">
//           <div className="flex items-center flex-shrink-0 text-white mr-6">
//             <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path className="heroicon-ui" d="M13 16v5a1 1 0 0 1-1 1H9l-3-6a2 2 0 0 1-2-2 2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2 0-1.1.9-2 2-2h7.59l4-4H20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2.41l-4-4H13zm0-2h1.41l4 4H20V4h-1.59l-4 4H13v6zm-2 0V8H6v2H4v2h2v2h5zm0 2H8.24l2 4H11v-4z" /></svg>
//             <Link to="/home" className="font-semibold text-xl tracking-tight m-2 hover:text-gray-600">Organize Power</Link>
//           </div>
//           <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
//             <div className="text-sm lg:flex-grow">
//               <NavLink to="/explore" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
//                 Home
//               </NavLink>
//               <NavLink to={`/profile/${userId}`} className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
//                 PROFILE
//               </NavLink>
//               {!isAuthenticated
//                 && (
//                   <NavLink to="/login" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
//                     LOGIN
//                   </NavLink>
//                 )}
//               {!isAuthenticated
//                 && (
//                   <NavLink to="/signup" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
//                     SIGNUP
//                   </NavLink>
//                 )}
//               {isAuthenticated
//                 && (
//                   <NavLink to="/login" onClick={handleLogout} className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
//                     LOGOUT
//                   </NavLink>
//                 )}
//             </div>
//           </div>
//         </nav>
//         <Switch>
//           {/* <Route
//             exact
//             path={`/class/${currentClass.id}`}
//             render={() => (
//               <Class
//                 user={user}
//                 currentMovement={currentMovement}
//                 setCurrentMovement={setCurrentMovement}
//               />
//             )}
//             /> */}
//           <Route
//             exact
//             path="/home"
//             render={() => (
//               <Home
//                 user={user}
//                 handleMovementTitleClick={handleMovementTitleClick}
//                 handleGroupTitleClick={handleGroupTitleClick}
//               />
//             )}
//           />
//           <Route
//             exact
//             path="/createGroup"
//             render={() => (
//               <CreateGroup
//                 user={user}
//               />
//             )}
//           />
//           <PrivateRoute
//             exact
//             path={`/profile/${userId}`}
//             component={Profile}
//             user={user}
//             handleMovementTitleClick={handleMovementTitleClick}
//             isAuthenticated={isAuthenticated}
//           />
//           <Route
//             exact
//             path="/login"
//             render={() => (
//               <Login
//                 setUser={setUser}
//                 setIsAuthenticated={setIsAuthenticated}
//                 setIsNewUser={setIsNewUser}
//                 isNewUser={isNewUser}
//               />
//             )}
//           />
//           <Route exact path="/signup" render={() => (<SignUp setIsNewUser={setIsNewUser} />)} />
//         </Switch>
//         <Redirect to="/explore" />
//       </div>
//     </Router>
//   );
// };

// export default Navbar;

import React, { useState } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react'

import Home from './Home.jsx';
import Profile from './Profile.jsx';
import Sessions from './Sessions.jsx';
import Logout from './Logout.jsx';

import 'semantic-ui-css/semantic.min.css';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (e, { name }) => setActiveItem(name);


  return (
    <div>

      <Menu pointing secondary>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
        >
          <NavLink to="/" class="item">Home</NavLink>
        </Menu.Item>

        <Menu.Item
          name='sessions'
          active={activeItem === 'sessions'}
          onClick={handleItemClick}
        >
          <NavLink to="/profile" class="item">Profile</NavLink>
        </Menu.Item>

        <Menu.Item
          name='profile'
          active={activeItem === 'profile'}
          onClick={handleItemClick}
        >
          <NavLink to="/sessions" class="item">Sessions</NavLink>
        </Menu.Item>

        <Menu.Menu position='right' class="right menu">
          <Menu.Item
            name='logout'
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
        </Switch>
      </div>

      {/* <Segment>
        <img src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
      </Segment> */}
    </div>
  )
}

export default Navbar;