const express = require("express");
const cradles = express.Router();
const Cradle = require('../../models/Cradle');
const passport = require('passport');

cradles.get('/', (req, res) => {
  Cradle.find()
    .then(cradles => res.json(cradles))
    .catch(err => res.status(404).json({ noCradlesFound: 'No cradles found' }));
});

cradles.get('/user/:user_id', (req, res) => {
  Cradle.find({creator: req.params.user_id})
    .then(cradles => res.json(cradles))
    .catch(err => res.status(404).json({ noCradlesFound: 'No cradles found from that user'}));
});

cradles.get('/:id', (req, res) => {
  Cradle.findById(req.params.id)
    .then(cradle => res.json(cradle))
    .catch(err =>
      res.status(404).json({ noIdFound: 'No cradle found with that ID' }));
});

cradles.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {


    const newCradle = new Cradle({
      title: req.body.title,
      creator: req.user.id
    }); 


    newCradle.save().then(cradle => res.json(cradle));
  });


module.exports = cradles; 
