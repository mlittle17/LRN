/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
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

const UpcomingSessions = ({ sessions, user, setNavbarSessionName, setEventId, regSessions }) => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);

  useEffect(() => {
    // remove the sessions that are before todays date
    const set = [];
    regSessions.forEach((session) => {
      const mDY = session.date.split('/').join('-');
      var date = moment(mDY);
      var now = moment();
      
      if (moment().subtract(1, 'days').isSameOrBefore(date)) {
        set.push(session);
      }
    })
    setUpcomingSessions(set);

  }, [regSessions])


  const rows = upcomingSessions.chunk(3);
  return (
    <div>
      <Typography gutterBottom variant="h4" component="h6" style={{ color: '#2d2e2e' }}><b>UPCOMING SESSIONS</b></Typography>
      {upcomingSessions.length < 1
        ? (
          <Typography variant="h6" component="h6" style={{ color: '#a58e57' }}><b>Try registering for some sessions!</b></Typography>
        )
        : (
      <Slider {...settings} style={{ width: '600px', height: '300px', backgroundColor: '#e0e1e2' }}>
        {rows.map((sessionPage) => {
          return (
            <div>
              <UpcomingTable sessionPage={sessionPage} user={user} setNavbarSessionName={setNavbarSessionName} setEventId={setEventId} />
            </div>
          );
        })}
      </Slider>
        )
      }
    </div>
  );
};

export default UpcomingSessions;
