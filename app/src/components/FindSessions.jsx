import React, { useState } from 'react';
import Cleave from 'cleave.js/react';
import { useGoogleMaps } from 'react-hook-google-maps';
// import axios from 'axios';

import { Form } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardActionArea, CardContent, Grid, Typography,
} from '@material-ui/core';

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

const FindSessions = () => {
  const classes = useStyles();

  const [zip, setZip] = useState(0);

  const onZipChange = (e) => {
    setZip(e.target.rawValue);
  };

  const { ref, map, google } = useGoogleMaps(
    // Use your own API key, you can get one from Google (https://console.cloud.google.com/google/maps-apis/overview)
    'AIzaSyC4Z5Qz97EWcoCczNn2IcYvaYG0L9pe6Rk',
    // NOTE: even if you change options later
    {
      center: { lat: 0, lng: 0 },
      zoom: 3,
    },
  );
  // console.log(map); // instance of created Map object (https://developers.google.com/maps/documentation/javascript/reference/map)
  // console.log(google); // google API object (easily get google.maps.LatLng or google.maps.Marker or any other Google Maps class)

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
              <Form.Field>
                <Cleave
                  placeholder="ZIP"
                  options={{
                    blocks: [5],
                    numericOnly: true,
                  }}
                  onChange={onZipChange}
                  className="form-field"
                />
              </Form.Field>
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
