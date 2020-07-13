import React from 'react';
import ProfileCard from './ProfileCard';
import Binder from './Binder';
// import axios from 'axios';

function Profile() {
  return (
    <div className="Profile">
      <ProfileCard />
      <Binder />
    </div>
  );
}

export default Profile;
