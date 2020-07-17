import React, { useState, useEffect } from 'react';

import { Typography } from '@material-ui/core';
import Slider from 'react-slick';

import UpcomingTable from './UpcomingTable.jsx';
import '../styles/Upcoming.css';

const sessions = [
  {
    name: 'History of the Aztec',
    creator: 'Prof. Alan Thicke',
    date: '07/26/2020',
    time: '5:30 pm',
  },
  {
    name: 'Homestyle Lasagna: The True Italian Way',
    creator: 'Rya Sicily',
    date: '08/03/2020',
    time: '7:25 pm',
  },
  {
    name: 'Traveling Light: Your Trip to Europe',
    creator: 'Greg Sanzen',
    date: '08/10/2020',
    time: '11:00 am',
  },
  {
    name: 'One, Two, Rhythm For Beginners',
    creator: 'Sarah Courtz',
    date: '09/15/2020',
    time: '6:00 pm',
  },
  {
    name: 'A Healthy Home: Hygiene to Keep Up',
    creator: 'Rita Teller',
    date: '09/17/2020',
    time: '8:00 pm',
  },
  {
    name: 'Balancing Your Checkbook',
    creator: 'Yare Rewwn',
    date: '10/10/2020',
    time: '12:00 pm',
  },
];
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

const UpcomingSessions = () => {
  // useEffect(() => {

  // }, []);

  const rows = sessions.chunk(3);
  return (
    <div>
      <Typography gutterBottom variant="h4" component="h6" style={{ color: '#2d2e2e' }}><b>UPCOMING SESSIONS</b></Typography>
      <Slider {...settings} style={{ width: '600px', height: '300px', backgroundColor: '#e0e1e2' }}>
        {rows.map((sessionPage) => {
          return (
            <div>
              <UpcomingTable sessionPage={sessionPage} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default UpcomingSessions;
