/* eslint-disable no-prototype-builtins */
/* eslint-disable quote-props */
import React, { useState, useEffect, forwardRef, useRef } from 'react';
import Geocode from 'react-geocode';
import Cleave from 'cleave.js/react';

import MapSessionList from './MapSessionList';
import { Button, Form } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import {
  Card, CardActionArea, CardContent, Collapse, Dialog, DialogTitle,
  Grid, IconButton, Typography,
} from '@material-ui/core';

import '../styles/Form.css';
import mapStyles from '../styles/Map.js'

// Set up the Geocoding for transforming the zip to lat and lon
// process.env.GOOGLE_API_KEY
Geocode.setApiKey('AIzaSyCVPR2bv5DCVKltpal636K0ei6zCIGb_68');

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 877,
    maxWidth: 810,
    minHeight: 498,
    maxHeight: 498,
    borderColor: '#474a2c',
  },
  dialog: {
    minWidth: 877,
    maxWidth: 810,
    minHeight: 577,
    maxHeight: 510,
    margin: 'auto',
    marginRight: 65,
    borderColor: '#474a2c',
  },
  grid: {
    marginTop: 40,
  },
  actionArea: {
    backgroundColor: '#a58e57',
  },
  searchCard: {
    maxWidth: 400,
    minWidth: 400,
    minHeight: 400,
    borderColor: '#474a2c',
  },
  mapCard: {
    maxWidth: 800,
    minWidth: 800,
    minHeight: 500,
    borderColor: '#474a2c',
  },
}));

// const Transition = forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// const Transition = forwardRef(function Transition(props, ref) {
//   return <Zoom ref={ref} {...props} />;
// });

const Transition = forwardRef(function Transition(props, ref) {
  return <Collapse ref={ref} {...props} />;
});


const subOptions = [
  { key: 'fi', text: 'Finance', value: 'finance' },
  { key: 'fd', text: 'Food', value: 'food' },
  { key: 'hs', text: 'History', value: 'history' },
  { key: 'lt', text: 'Literature', value: 'literature' },
  { key: 'ma', text: 'Math', value: 'math' },
  { key: 'mu', text: 'Music', value: 'music' },
  { key: 'sc', text: 'Science', value: 'science' },
  { key: 'sk', text: 'Skill', value: 'skill' },
  { key: 'ot', text: 'Other', value: 'other' },
];

const markers = [];

const FindSessions = ({ user, sessions, regSessions }) => {
  const classes = useStyles();

  // Input field states
  const [subject, setSubject] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [zip, setZip] = useState('*****');

  // Map and location data states
  const ref = useRef();
  let [map, setMap] = useState();
  const [focused, setFocused] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [userLoc, setUserLoc] = useState(() => {
    if (user) {
      return user.location;
    }
  });
  const [sessionColl, setSessionColl] = useState({});
  const [sessionList, setSessionList] = useState({});
  const [filteredSearchList, setFilteredSearchList] = useState(null);
  const [currMapLocs, setCurrMapLocs] = useState([]);

  // The custom marker images
  const sessionsMarker = 'https://res.cloudinary.com/dbw14clas/image/upload/c_scale,h_80,w_90/v1595383700/CustomBlackMapMarker.png';
  const centerMarker = 'https://res.cloudinary.com/dbw14clas/image/upload/c_scale,h_80,w_90/v1595495976/customWhiteCenterMarker.png';

  const handleClose = () => {
    setListOpen(false);
  };

  const onSessionSubjectChange = (e, result) => {
    const { value } = result;
    showMarkers();
    setSubject(value);
  };

  const onSessionDateChange = (e) => {
    showMarkers();
    setSessionDate(e.target.value);
  };

  const onZipChange = (e) => {
    setZip(e.target.rawValue);
  };

  useEffect(() => {
    const onLoad = () => setMap(new window.google.maps.Map(ref.current, {
          center: { lat: 39.7837304, lng: -100.4458825 }, // set the map to focus over the us when it loads, so the user experiences the zoom in on their location once the user object becomes available
          zoom: 4.4,
          zoomControl: false,
          mapTypeControl: true,
          // mapTypeControlOptions: {
          //   style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          //   mapTypeIds: ['roadmap', 'terrain'],
          // },
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          styles: mapStyles,
        }
      ))
    if (!window.google) {
      const script = document.createElement(`script`)
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCVPR2bv5DCVKltpal636K0ei6zCIGb_68`
      document.head.append(script)
      script.addEventListener(`load`, onLoad)
      return () => script.removeEventListener(`load`, onLoad)
    } else {
      onLoad()
    }
    
  }, []);

  /* Marker visibility functions */
  // Sets the map on all markers in the array, making them visible
  const showMarkers = () => {
    markers.forEach((marker) => {
      marker.setMap(map);
      marker.setVisible(true);
    });
  };

  // Removes the markers from the map, but does not delete them from the array
  const clearMarkersWhere = (searchType, searchValue) => {
    // Remove the markers where at least one session does not exist that matches the criteria in the search fields
    markers.forEach((marker) => {
      if(sessionColl[marker.zip]) {
        if (!(sessionColl[marker.zip].some((session) => session[searchType].toLowerCase() === searchValue))) {
          marker.setMap(null);
          marker.setVisible(false);
        }
      }
    });

    let filtered;
    if(filteredSearchList === null) {
      filtered = {...sessionColl}
    } else {
      filtered = {...filteredSearchList}
    }

    if(sessionDate !== '' && sessionDate.length === 10) {
      for(let key in filtered) {
        filtered[key] = filtered[key].filter(session => session.date === sessionDate)
      }
      console.log(filtered, 'filtered by date')
      setFilteredSearchList(filtered);
    }
    if(subject !== '') {
      for(let key in filtered) {
        filtered[key] = filtered[key].filter(session => session.topic.toLowerCase() === subject)
      }
      console.log(filtered, 'filtered by subject')
      setFilteredSearchList(filtered);
    }
  };

  // Clear the form of all searched and reset the map view
  const clearForm = () => {
    setSubject('');
    setSessionDate('');
    setZip('*****');
    setFilteredSearchList(null)
    showMarkers();
  };

  // Focus on the user's recorded area
  const focusLocalSessions= () => {
    if(map) {
      if(user) {
        setFocused(!focused);
        if(focused) {
          map.setOptions({
            center: { lat: 39.7837304, lng: -100.4458825 }, // set the map to focus over the us,
            zoom: 4.4,
          });
        } else {
          const { location } = user;
          map.setOptions({
            center: location,
            zoom: 12,
          });
        }
      }
    }
  }

  // Add a marker to the map, at the provided coordinates, with the provided image
  const addMarker = (markerObj, url) => {
    const { zipcode } = markerObj;

    const marker = new window.google.maps.Marker({
      map,
      position: markerObj,
      title: zipcode.toString(),
      icon: {
        url,
      },
    });
    marker.zip = zipcode;

    /* Assign click events only to the (black) Session markers-- 
       (White)Center markers will only appear when a user searches a zip that contains no sessions & have nothing to display */
    if(!url.includes('customWhiteCenterMarker')) {
      marker.addListener('click', () => {
        // Check the current state of the inputs for Subject and Date
        // Filter the sessions collection passed down to the dialog list
        if(sessionDate !== '' && sessionDate.length === 10) {
          setSessionList({ zip: marker.title, sessions: filteredSearchList });
        }
        if(subject !== '') {
          setSessionList({ zip: marker.title, sessions: filteredSearchList });
        } else {
          setSessionList({ zip: marker.title, sessions: sessionColl[marker.title] });
        }
        setListOpen(true);

        // Focus the map onto the selected zip code area, by clicked marker
        map.setZoom(8);
        map.setCenter(marker.getPosition());
      });
    }

    // Store the created markers to allow removing and readding by visibility needs later
    markers.push(marker);
    return marker;
  };

  // Execute when map object is ready
  // Add the markers for session object zips that exist within the state
  useEffect(() => {
    if (map) {
      // Add markers to all appropriate zips
      currMapLocs.forEach((mapLoc) => {
        addMarker(mapLoc, sessionsMarker);
      });
    }
  }, [map, currMapLocs])

  // Watching the sessions prop for update
  useEffect(() => {
    // Create a new collection that has a property of the zip and a value of the collection of sessions objects found in that zip.
    // Allows the sessions to be added to the map with only one marker representing a sessions set there
    const zipsForMarkers = {};
    sessions.forEach((session) => {
      if (!zipsForMarkers.hasOwnProperty(session.zip)) {
        zipsForMarkers[session.zip] = [session];
      } else {
        zipsForMarkers[session.zip].push(session);
      }
    });

    delete zipsForMarkers.null;
    setSessionColl(zipsForMarkers);

    // Iterate over the new zipcode key sorted collection of sessions arrays.
    // Geocode the zipcodes associated with the sessions in order to create the collection that can be used for populating the map with markers
    Object.keys(zipsForMarkers).forEach((zipForMarker) => {
      Geocode.fromAddress(zipForMarker)
      .then((response) => {
          const { lat, lng } = response.results[0].geometry.location;
          if (currMapLocs.every((mapObj) => mapObj.zipcode.toString() !== zipForMarker)) {
            // Build the collection in simulated state as the session objects are transformed into the usable lat/lng format
            setCurrMapLocs([...currMapLocs, { lat, lng, zipcode: zipForMarker }]);
          }
        },
        error => {
          console.error('Error geocoding zips for sessions:', error);
        },
      );
    });
  }, [sessions]);

  // Watching the subject state value for update
  // (When a user searches by subject)
  useEffect(() => {
    // Remove any markers from the map that do not have any sessions that have the subject of searched value
    clearMarkersWhere('topic', subject);
  }, [subject]);

  // Watching the date state value for update
  // (When a user searches by date)
  useEffect(() => {
    // Remove any markers from the map that do not have any sessions that have the date of searched value
    if (sessionDate.toString().length === 10) {
      clearMarkersWhere('date', sessionDate);
    }
  }, [sessionDate]);

  // Watching the zip state value for update
  // (When a user searches by zipcode)
  useEffect(() => {
    // Find the lat and lon to re-center the map over, based on the user's search provided zip
    Geocode.fromAddress(zip).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        // Update the user's 'location' with the geocoded data
        setUserLoc({
          lat,
          lng,
          zipcode: zip,
        });
        // Center and zoom the map to match the current value in the zip search field
        map.setOptions({
          center: {
            lat,
            lng,
          },
          zoom: 12,
        });

        // Only allow the custom ZipCenter marker to be added after the finished zip search, not on an incomplete code.
        // Only allow if there are no sessions scheduled in that area.
        if (zip.toString().length === 5 && sessionColl[zip] === undefined) {
          addMarker({
            lat,
            lng,
            zipcode: zip,
          },
            centerMarker);
        }
      },
      error => {
        console.error(error);
      },
    );
  }, [zip]);

  return (
    <div className="Find">
      <Grid container justify="space-around" className={classes.grid}>
        <div>
          {/* Search Filter Component */}
          <Card className={classes.searchCard} variant="outlined">
            <CardActionArea className={classes.actionArea}>
              <div style={{ marginTop: '10px' }}>
                <Typography gutterBottom variant="h4" component="h1" align="center">
                  SEARCH
                </Typography>
              </div>
              <br />
            </CardActionArea>
            <CardContent>
              <Form>
                {/* subject select */}
                <Form.Select
                  fluid
                  label="Subject"
                  options={subOptions}
                  placeholder="Subject"
                  onChange={onSessionSubjectChange}
                  value={subject}
                />

                {/* date search */}
                <Form.Field className="form-field">
                  <label>Date</label>
                  <Cleave
                    placeholder="MM/DD/YYYY"
                    options={{ date: true, datePattern: ['m', 'd', 'Y'] }}
                    onChange={onSessionDateChange}
                    value={sessionDate}
                    className="form-field"
                  />
                </Form.Field>

                {/* zip search */}
                <Form.Field>
                  <label>ZIP</label>
                  <Cleave
                    options={{
                      blocks: [5],
                      numericOnly: true,
                    }}
                    onChange={onZipChange}
                    value={zip}
                    placeholder="*****"
                    className="form-field"
                  />
                </Form.Field>
              </Form><br /><br />
              <Button onClick={focusLocalSessions} style={{ backgroundColor: '#474A2C', color: '#F6FEF5', float: 'left' }}>
                {focused === false
                ? (
                  'My Area'
                )
                : (
                  <ZoomOutIcon fontSize="large"/>
                )
                }
              </Button>
              <Button onClick={clearForm} style={{ backgroundColor: '#474a2c', color: '#f6fef5', float: 'right' }}>Clear Search</Button>
            </CardContent>
          </Card>
        </div>

        {/* Session List 'Popup' Component */}
        <Dialog
          className={classes.dialog}
          aria-labelledby="max-width-dialog-title"
          variant="outlined"
          scroll="paper"
          fullWidth="true"
          maxWidth="md"
          open={listOpen}
          onClose={handleClose}
          hideBackdrop="true"
          TransitionComponent={Transition}
        >
          <Card className={classes.card} variant="outlined">
            <DialogTitle id="max-width-dialog-title" className={classes.actionArea}>
              <IconButton edge="start" color="inherit" fontSize="large" aria-label="close" style={{ float: 'left' }} onClick={handleClose} >
                <CloseIcon />
              </IconButton>
              <Typography variant="h3" align="center">
                <LocationSearchingIcon fontSize="large" /><b>SESSIONS: {sessionList.zip}</b>
              </Typography>
            </DialogTitle>

            <MapSessionList user={user} sessionList={sessionList.sessions} sessionsZip={sessionList.zip} regSessions={regSessions}/>
          </Card>
        </Dialog>

        {/* Map Component */}
        <Card className={classes.mapCard} variant="outlined">
          <div ref={ref} style={{ width: 798, height: 498 }} />
        </Card>
      </Grid>
    </div>
  );
};

export default FindSessions;
