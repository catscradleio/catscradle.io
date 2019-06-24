const doodles = require('express').Router();
const Doodle = require('../../models/Doodle');
const passport = require('passport');

doodles.get('/', (req, res) => {
  let userId = req.userId;
  Doodle.find({creator: userId})
    .then(doodles => res.json(doodles))
    .catch(err => res.status(404).json({ noDoodlesFound: 'No doodles found from that user'}));
});

doodles.get('/:id', (req, res) => {
  let DoodleId = req.params.id;

  Doodle.findById(DoodleId)
    .then(Doodle => res.json(Doodle))
    .catch(err =>
      res.status(404).json({ noIdFound: 'No Doodle found with that ID' }));
});

doodles.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newDoodle = new Doodle({
      title: req.body.title,
      creator: req.user.id
    }); 


    newDoodle.save().then(doodle => res.json(doodle));
  });


module.exports = doodles; 
