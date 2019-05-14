const cradles = require('express').Router();
const Cradle = require('../../models/Cradle');
const passport = require('passport');

cradles.get('/', (req, res) => {
  let userId = req.userId;
  Cradle.find({creator: userId})
    .then(cradles => res.json(cradles))
    .catch(err => res.status(404).json({ noCradlesFound: 'No cradles found from that user'}));
});

cradles.get('/:id', (req, res) => {
  let cradleId = req.params.id;

  Cradle.findById(cradleId)
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
