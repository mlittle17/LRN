import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import SessionCard from './SessionCard.jsx';

const localizer = momentLocalizer(moment);

const mySessionsList = [{
  'title': 'DTS STARTS',
  'start': new Date(2020, 7, 13, 0, 0, 0),
  'end': new Date(2020, 7, 20, 0, 0, 0),
},
{
  'title': 'DTS ENDS',
  'start': new Date(2020, 10, 6, 0, 0, 0),
  'end': new Date(2020, 10, 13, 0, 0, 0),
},
{
  'title': 'Conference',
  'start': new Date(2021, 3, 11),
  'end': new Date(2021, 3, 13),
  'desc': 'Big conference for important people',
},
{
  'title': 'Meeting',
  'start': new Date(2021, 3, 12, 10, 30, 0, 0),
  'end': new Date(2021, 3, 12, 12, 30, 0, 0),
  'desc': 'Pre-meeting meeting, to prepare for the meeting',
}];

const SessionCalendar = ({
  user,
  sessions,
}) => {
  const [SessionsList, setSessionsList] = useState(mySessionsList);

  // useEffect(() => {
  //   const sessionsColl = [];

  //   sessions.forEach((sessionObj) => {
  //     const {
  //       name, startDate, endDate, category, description, time, location, rsvpCount, id,
  //     } = sessionObj;
  //     // console.log('eventId', id);
  //     // console.log('userId', user.id);

  //     sessionsColl.push({
  //       "title": name,
  //       "start": startDate,
  //       "end": endDate,
  //       "desc": description,
  //       "other": {
  //         category,
  //         time,
  //         location,
  //         rsvpCount,
  //         eventId: id,
  //         userId: user.id,
  //       },
  //     });
  //   });
  //   setSessionsList(sessionsColl);
  // }, []);

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
