import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Binder() {
  return (
    <div className="Binder">
      <h1>My Binder</h1>
      <tbody>
        <td>Type</td>
        <td> Name</td>
        <td> Creator</td>
        <td> Date Created</td>
      </tbody>
    </div>
  );
}

export default Binder;
