/* eslint-disable no-prototype-builtins */
/* eslint-disable quote-props */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import Cleave from 'cleave.js/react';
import Geocode from 'react-geocode';
import { useGoogleMaps } from 'react-hook-google-maps';

import { Button, Form } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import {
  Card, CardActionArea, CardContent, Dialog, DialogTitle, Divider,
  Grid, IconButton, List, ListItem, Typography,
} from '@material-ui/core';

import '../styles/Form.css';

// Set up the Geocoding for transforming the zip to lat and lon
Geocode.setApiKey('AIzaSyCVPR2bv5DCVKltpal636K0ei6zCIGb_68');

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 798,
    maxWidth: 798,
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
    marginRight: 70,
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

const FindSessions = ({ user, sessions }) => {
  const classes = useStyles();
  // Input field states
  const [subject, setSubject] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [zip, setZip] = useState(0);

  // Map and location data states
  const [listOpen, setListOpen] = useState(false);
  const [userLoc, setUserLoc] = useState(() => {
    if (user) {
      console.log(user.location);
      return user.location;
    }
  });
  const [sessionColl, setSessionColl] = useState({});
  const [sessionList, setSessionsList] = useState([]);
  const [currMapLocs, setCurrMapLocs] = useState([
    // { lat: 30.35058129999999, lng: -91.0873551, zipcode: 70810 },
    // { lat: 30.4293497, lng: -91.1686843, zipcode: 70808 },
    // { lat: 30.4475809, lng: -91.1756636, zipcode: 70806 },
    // { lat: 30.4362797, lng: -91.1773287, zipcode: 70802 },
    // { lat: 30.5267767, lng: -91.1280092, zipcode: 70811 },
  ]);
  const markers = [];
  // const [markers, setMarkers] = useState([]);

  // The custom marker images
  const sessionsMarker = 'https://res.cloudinary.com/dbw14clas/image/upload/c_scale,h_80,w_90/v1595383700/CustomBlackMapMarker.png';
  const centerMarker = 'https://res.cloudinary.com/dbw14clas/image/upload/c_scale,h_80,w_90/v1595495976/customWhiteCenterMarker.png';

  const handleClose = () => {
    setListOpen(false);
  };

  const onSessionSubjectChange = (e, result) => {
    const { value } = result;
    setSubject(value);
  };

  const onSessionDateChange = (e) => {
    setSessionDate(e.target.rawValue);
  };

  const onZipChange = (e) => {
    setZip(e.target.rawValue);
  };

  const { ref, map, google } = useGoogleMaps(
    // Use your own API key, you can get one from Google (https://console.cloud.google.com/google/maps-apis/overview)
    'AIzaSyCVPR2bv5DCVKltpal636K0ei6zCIGb_68',
    {
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
      styles: [
        {
          'featureType': 'all',
          'elementType': 'geometry',
          'stylers': [
            {
              'visibility': 'on',
            },
            {
              'color': '#51562d',
            },
          ],
        },
        {
          'featureType': 'all',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off',
            },
            {
              'color': '#b5c75c',
            },
          ],
        },
        {
          'featureType': 'all',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'visibility': 'on',
            },
          ],
        },
        {
          'featureType': 'all',
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'color': '#000000',
            },
            {
              'visibility': 'on',
            },
          ],
        },
        {
          'featureType': 'administrative.land_parcel',
          'elementType': 'geometry',
          'stylers': [
            {
              'visibility': 'on',
            },
          ],
        },
        {
          'featureType': 'landscape',
          'elementType': 'all',
          'stylers': [
            {
              'visibility': 'on',
            },
          ],
        },
        {
          'featureType': 'landscape',
          'elementType': 'geometry',
          'stylers': [
            {
              'visibility': 'on',
            },
            {
              // #474a00
              'color': '#43462c',
            },
          ],
        },
        {
          'featureType': 'landscape.man_made',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'visibility': 'on',
            },
            {
              'color': '#c4a96f',
            },
          ],
        },
        {
          'featureType': 'landscape.natural',
          'elementType': 'all',
          'stylers': [
            {
              'visibility': 'on',
            },
          ],
        },
        {
          'featureType': 'landscape.natural',
          'elementType': 'geometry',
          'stylers': [
            {
              'visibility': 'on',
            },
          ],
        },
        {
          'featureType': 'landscape.natural',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'visibility': 'on',
            },
          ],
        },
        {
          'featureType': 'landscape.natural.landcover',
          'elementType': 'geometry',
          'stylers': [
            {
              'visibility': 'on',
            },
            {
              'color': '#000000',
            },
          ],
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry',
          'stylers': [
            {
              'visibility': 'on',
            },
            {
              'color': '#9d7a22',
            },
          ],
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'geometry',
          'stylers': [
            {
              'visibility': 'on',
            },
          ],
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#7b7a4d',
            },
          ],
        },
        {
          'featureType': 'water',
          'elementType': 'geometry',
          'stylers': [
            {
              'visibility': 'on',
            },
          ],
        },
        {
          'featureType': 'water',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#f6fef5',
            },
          ],
        },
      ],
    },
  );

  // console.log('map instance:', map); // instance of created Map object (https://developers.google.com/maps/documentation/javascript/reference/map)
  // console.log('google api object:', google); // google API object (easily get google.maps.LatLng or google.maps.Marker or any other Google Maps class)


  // Marker visibility functions
  // Sets the map on all markers in the array, making them visible
  const showMarkers = () => {
    markers.forEach((marker) => {
      marker.setMap(map);
      marker.setVisible(true);
    });
  };

  // Removes the markers from the map, but does not delete them from the array
  const clearMarkersWhere = (searchType, searchValue) => {
    markers.forEach((marker) => {
      marker.setMap(null);
      marker.setVisible(false);

      // if (!(sessionColl[marker.zip].every((session) => session[searchType] === searchValue))) {
      //   // marker.setMap(null);
      //   marker.setVisible(false);

      // }
    });
    // if (marker[searchType] !== searchValue) {
  };

  // Clear the form of all searched and reset the map view
  const clearForm = () => {
    // let form = document.querySelector('form');
    // console.log('form:', form);
    // $('form').form('reset');

    setSubject('');
    setSessionDate('');
    setZip(0);
    showMarkers();
  };
  // Add a marker to the map, at the provided coordinates, with the provided image
  const addMarker = (markerObj, url) => {
    console.log('add marker, markerObj:', markerObj);
    const { zipcode } = markerObj;

    const marker = new google.maps.Marker({
      map,
      position: markerObj,
      title: zipcode.toString(),
      icon: {
        url,
      },
    });
    marker.zip = zipcode;
    marker.addListener('click', () => {
      console.log(marker.title);
      setSessionsList(sessionColl[marker.title]);
      setListOpen(true);
      // map.setZoom(8);
      // map.setCenter(marker.getPosition());
    });

    markers.push(marker);
    // setMarkers([...markers, marker]);
    return marker;
  };

  // Execute when map object is ready
  // Add the markers for session object zips that exist within the state
  if (map) {
    // if (user) {
    //   const { location } = user;
    //   map.setOptions({
    //     center: location,
    //     zoom: 12,
    //   });
    // }

    // Add markers to all appropriate zips
    currMapLocs.forEach((mapLoc) => {
      addMarker(mapLoc, sessionsMarker);
    });
  }

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
    // console.log('zipsForMarkers:', zipsForMarkers);
    delete zipsForMarkers.null;
    setSessionColl(zipsForMarkers);

    Object.keys(zipsForMarkers).forEach((zipForMarker) => {
      console.log(`zipForMarker: ${zipForMarker}: ${zipsForMarkers[zipForMarker]}`);
      Geocode.fromAddress(zipForMarker).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          if (currMapLocs.every((mapObj) => mapObj.zipcode !== zipForMarker)) {
            setCurrMapLocs([...currMapLocs, { lat, lng, zipcode: zipForMarker }]);
          }
        },
        error => {
          console.error('Error geocoding zips for sessions:', error);
        },
      );
    });
  }, [sessions]);

  // Watching the user prop for update
  // When the user prop becomes available, and is no longer null
  useEffect(() => {
    if (map) {
      if (user) {
        const { location } = user;
        map.setOptions({
          center: location,
          zoom: 12,
        });
      }
    }
  }, [user]);

  // Watching the subject state value for update
  // (When a user searches by subject)
  useEffect(() => {
    // Remove any markers from the map that do not have any sessions that have the subject of searched value
    console.log('subject:', subject);
    console.log('markers:', markers);
    clearMarkersWhere('topic', subject);
  }, [subject]);

  // Watching the date state value for update
  // (When a user searches by date)
  useEffect(() => {
    // Remove any markers from the map that do not have any sessions that have the subject of searched value
    clearMarkersWhere('date', sessionDate);
  }, [sessionDate]);

  // Watching the zip state value for update
  // (When a user searches by zipcode)
  useEffect(() => {
    // Find the lat and lon to re-center the map over, based on the user's search provided zip
    Geocode.fromAddress(zip).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log('searched zip:', lat, lng);
        setUserLoc({
          lat,
          lng,
          zipcode: zip,
        });
        map.setOptions({
          center: {
            lat,
            lng,
          },
          zoom: 12,
        });
        // if (zip.toString.length === 5) {
        addMarker({
          lat,
          lng,
          zipcode: zip,
        },
        centerMarker);
        // }
      },
      error => {
        console.error(error);
      },
    );
  }, [zip]);

  // Watching the userLoc state value for update
  // (When the userLoc state value is updated)
  // useEffect(() => {
  //   // Add a new marker over the center
  //   /* Does not necessarily mean there are session there but signifies to the user
  //      that a new zipcode has been focused on */
  //   addMarker(userLoc, centerMarker);
  // }, [userLoc]);

  // When the map is dragged, write the new center zip to the form
  // $('form').form('set values', {
  //   zip: CODE TO FIND NEW MAP CENTER, THEN GEOCODED,
  // })

  return (
    <div className="Find">
      <Grid container justify="space-around" className={classes.grid}>
        <div>
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
              <Button onClick={clearForm} style={{ backgroundColor: '#474a2c', color: '#f6fef5', float: 'right' }}>Clear Search</Button>
            </CardContent>
          </Card>
        </div>
        <Dialog
          fullWidth="true"
          className={classes.dialog}
          maxWidth="md"
          scroll="paper"
          open={listOpen}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
          hideBackdrop="true"
        >
          <Card className={classes.root} variant="outlined">
            <DialogTitle id="max-width-dialog-title" className={classes.actionArea}>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close" style={{ float: 'left' }}>
                  <CloseIcon />
                </IconButton>
                <Typography variant="h3" align="center">
                  SCHEDULED SESSIONS
                </Typography>
            </DialogTitle>

            <List style={{ width: '100%', backgroundColor: '' }}>
              { sessionList.map((session) => (
                <ListItem alignItems="flex-start" style={{ backgroundColor: '#2d2e2e', color: '#f6fef5' }}>
                  <Grid container justify="space-evenly">
                    <Typography variant="h5">
                      <b>{session.name.toUpperCase()}</b>
                    </Typography><br />
                    <Typography variant="h7">
                      {session.date} {session.time}
                    </Typography>
                  </Grid>

                  <Grid container justify="space-evenly">
                    <Typography variant="h5">
                      {session.topic.toUpperCase()}
                    </Typography>
                    <Typography variant="h7">
                      {session.description}
                    </Typography>
                  </Grid><br />
                  <Divider variant="middle" color="primary" /><br />
                </ListItem>
              ))}
            </List>

          </Card>
        </Dialog>
        <Card className={classes.mapCard} variant="outlined">
          <div ref={ref} style={{ width: 798, height: 498 }} />
        </Card>
      </Grid>
    </div>
  );
};

export default FindSessions;
