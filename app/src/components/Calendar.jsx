import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import SessionCard from './SessionCard.jsx';

const localizer = momentLocalizer(moment);

const mySessionsList = [{
  'title': 'History of the Aztec',
  'start': new Date(2020, 6, 26, 0, 0, 0),
  'end': new Date(2020, 6, 26, 0, 0, 0),
},
{
  'title': 'Love and Marriage: Basic Tenants of a Loving Couple',
  'start': new Date(2020, 6, 30),
  'end': new Date(2020, 6, 30),
  'desc': 'Big conference for important people',
},
{
  'title': 'Homestyle Lasagna: The True Italian Way',
  'start': new Date(2020, 7, 3),
  'end': new Date(2020, 7, 3),
  'desc': 'Pre-meeting meeting, to prepare for the meeting',
},
{
  'title': 'Traveling Light: Your Trip to Europe',
  'start': new Date(2020, 7, 10),
  'end': new Date(2020, 7, 10),
  'desc': 'Pre-meeting meeting, to prepare for the meeting',
},
{
  'title': 'Your Utility Bill Fees Explained',
  'start': new Date(2020, 7, 27),
  'end': new Date(2020, 7, 27),
  'desc': 'Pre-meeting meeting, to prepare for the meeting',
},
{
  'title': 'One, Two, Rhythm For Beginners',
  'start': new Date(2020, 8, 15),
  'end': new Date(2020, 8, 15),
  'desc': 'Pre-meeting meeting, to prepare for the meeting',
},
{
  'title': 'Visual Learning Techniques',
  'start': new Date(2020, 8, 20),
  'end': new Date(2020, 8, 20),
  'desc': 'Pre-meeting meeting, to prepare for the meeting',
}];

const SessionCalendar = ({
  user,
  sessions,
}) => {
  const [SessionsList, setSessionsList] = useState(mySessionsList);

  useEffect(() => {
    const sessionsColl = [];

    sessions.forEach((sessionObj) => {
      const {
        topic, date, time, id, users_id,
      } = sessionObj;
      // console.log('eventId', id);
      // console.log('userId', user.id);
      // console.log(sessionObj);

      sessionsColl.push({
        title: topic,
        start: date,
        end: date,
        // "desc": description,
        other: {
          // category,
          time,
          // location,
          // rsvpCount,
          eventId: id,
          userId: users_id,
        },
      });
    });
    console.log(sessionsColl);
    // setSessionsList(sessionsColl);
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={SessionsList}
        views={['month', 'agenda']}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 350, width: 600 }}
        components={{
          event: SessionCard,
        }}
      />
    </div>
  );
};

export default SessionCalendar;
