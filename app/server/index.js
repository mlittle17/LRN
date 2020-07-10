const { app } = require('./app');

// start express server on port 5000
app.listen(8000, () => {
  console.log('server started on port 8000');
});
