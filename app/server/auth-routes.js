const router = require('express').Router();
const passport = require('passport');
const cors = require('cors');

router.use(cors());

// auth login
router.get('/', (req, res) => {
  res.redirect('/auth/google');
});

// auth logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// auth with google
router.get('/login', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
// res.send(req.user);761585

  res.redirect('/profile');
});

router.get('/exist', (req, res) => {
  if (!req.user) {
    res.send('no one here');
  } else {
    res.send(req.user);
  }
});

module.exports = router;
