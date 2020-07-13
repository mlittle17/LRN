import React, { useState, useEffect } from 'react';

import { Typography } from '@material-ui/core';
import Slider from 'react-slick';

import '../styles/Upcoming.css';

const sessions = [
  {
    creator: 'fdfdff',
    date: '09/34/7899',
    time: '05:34 pm',
  },
  {
    creator: 'ryknnl',
    date: '05/67/1253',
    time: '12:25 am',
  },
  {
    creator: 'dsdf',
    date: "14/04/4565",
    time: '56:54 pm pm',
  },
];
const settings = {
  arrows: true,
  className: 'slider',
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const UpcomingSessions = () => {
  // useEffect(() => {

  // }, []);

  return (
    <div>
      <Typography gutterBottom variant="h6" component="h6"><b>UPCOMING</b></Typography>
      <Slider {...settings}>
        {sessions.map((page) => {
          return (
            <div>
              {page.creator}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default UpcomingSessions;
