/* eslint-disable quote-props */
import React, { useState, useEffect } from 'react';
import Cleave from 'cleave.js/react';
import Geocode from 'react-geocode';
import { useGoogleMaps } from 'react-hook-google-maps';

import { Button, Form } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardActionArea, CardContent, Grid, Typography,
} from '@material-ui/core';

import '../styles/Form.css';

const useStyles = makeStyles((theme) => ({
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

// Set up the Geocoding for transforming the zip to lat and lon
Geocode.setApiKey('AIzaSyCVPR2bv5DCVKltpal636K0ei6zCIGb_68');

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

const FindSessions = () => {
  const classes = useStyles();

  const [subject, setSubject] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [zip, setZip] = useState(0);

  const [userLoc, setUserLoc] = useState({});


  useEffect(() => {
    // Find the lat and lon to initially center the map over, based on the user's zip
    // Get latidude & longitude from address.
    Geocode.fromAddress('70810').then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setUserLoc({
          lat,
          lng,
        });
      },
      error => {
        console.error(error);
      },
    );
  }, []);

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

  const onMapChange = (e) => {

  };

  const { ref, map, google } = useGoogleMaps(
    // Use your own API key, you can get one from Google (https://console.cloud.google.com/google/maps-apis/overview)
    'AIzaSyCVPR2bv5DCVKltpal636K0ei6zCIGb_68',
    {
      center: { lat: 30.35058129999999, lng: -91.0873551 },
      zoom: 12,
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
    },
  );
  // console.log('map instance:', map); // instance of created Map object (https://developers.google.com/maps/documentation/javascript/reference/map)
  // console.log('google api object:', google); // google API object (easily get google.maps.LatLng or google.maps.Marker or any other Google Maps class)


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
                    className="form-field"
                  />
                </Form.Field>

                {/* zip search */}
                <Form.Field>
                  <label>ZIP</label>
                  <Cleave
                    placeholder="*****"
                    options={{
                      blocks: [5],
                      numericOnly: true,
                    }}
                    onChange={onZipChange}
                    className="form-field"
                  />
                </Form.Field>
              </Form><br /><br />
            </CardContent>
          </Card>
        </div>
        <Card className={classes.mapCard} variant="outlined">
          <div ref={ref} style={{ width: 798, height: 498 }} />
        </Card>
      </Grid>
    </div>
  );
};

export default FindSessions;
