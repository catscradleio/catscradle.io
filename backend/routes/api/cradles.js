const express = require("express");
const router = express.Router();
const Cradle = require('../../models/Cradle');
const passport = require('passport');

router.get('/', (req, res) => {
  Cradle.find()
    .then(cradles => res.json(cradles))
    .catch(err => res.status(404).json({nocradlesfound: 'No cradles found'}));
});

router.get('/:id', (req, res) => {
  Cradle.findById(req.params.id)
    .then(cradle => res.json(cradle))
    .catch(err =>
      res.status(404).json({ noIdfound: 'No cradle found with that ID' }));
});

router.post('/', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
  

    const newCradle = new Cradle({
      title: req.body.title,
      creator: req.user.id
    });
    console.log(req.user.id);


    newCradle.save().then(cradle => res.json(cradle));
});


module.exports = router;