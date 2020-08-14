/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import { Typography } from '@material-ui/core';
import Slider from 'react-slick';

import UpcomingTable from './UpcomingTable.jsx';
import '../styles/Upcoming.css';

const settings = {
  arrows: true,
  className: 'slides',
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

// eslint-disable-next-line no-extend-native
Object.defineProperty(Array.prototype, 'chunk', {
  // eslint-disable-next-line func-names
  // eslint-disable-next-line object-shorthand
  value: function (chunkSize) {
    const P = [];
    for (let i = 0; i < this.length; i += chunkSize) {
      P.push(this.slice(i, i + chunkSize));
    }
    return P;
  },
});

const UpcomingSessions = ({ sessions, user, setNavbarSessionName }) => {
  // Simplify and sort to order the sessions by upcoming dates
  sessions.map((session) => {
    const { date } = session;
    // new Date(date.slice(6, date.length), date.slice(0, 2) - 1, date.slice(3, 5));
    session.sortDate = date.replace(/\//g, '-');
    return session;
  });

  const sortDates = (a, b) => a - b;
    // .sort((a, b) => {
      // console.log('minus', a.sortDate.valueOf() - b.sortDate.valueOf());
      // Turn strings into dates, and then subtract them, to get a value that is either -, +, or 0
      // return a.sortDate.valueOf() - b.sortDate.valueOf();
    // });

  sessions.sort(sortDates);

  console.log(sessions);
  const rows = sessions.chunk(3);
  return (
    <div>
      <Typography gutterBottom variant="h4" component="h6" style={{ color: '#2d2e2e' }}><b>UPCOMING SESSIONS</b></Typography>
      <Slider {...settings} style={{ width: '600px', height: '300px', backgroundColor: '#e0e1e2' }}>
        {rows.map((sessionPage) => {
          return (
            <div>
              <UpcomingTable sessionPage={sessionPage} user={user} setNavbarSessionName={setNavbarSessionName} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default UpcomingSessions;
