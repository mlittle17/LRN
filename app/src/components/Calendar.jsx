import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import SessionCard from './SessionCard.jsx';

const localizer = momentLocalizer(moment);

const mySessionsList = [{
  'title': 'DTS STARTS',
  'start': new Date(2020, 7, 13, 0, 0, 0),
  'end': new Date(2020, 7, 13, 0, 0, 0),
},
{
  'title': 'Conference',
  'start': new Date(2020, 8, 11),
  'end': new Date(2020, 8, 11),
  'desc': 'Big conference for important people',
},
{
  'title': 'Meeting',
  'start': new Date(2020, 11, 12, 10, 30, 0, 0),
  'end': new Date(2020, 11, 12, 10, 30, 0, 0),
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
