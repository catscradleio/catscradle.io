const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')

const User = require('../../models/User');

router.post('/register', (req, res) => {
  const { email } = req.body;
  User.findOne({ email })
    .then(user => {
      if(user) {
        return res.status(400).json({ email: 'Email already exists' });
      }
      const { handle, email, password } = req.body;
      const newUser = new User({ handle, email, password });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;

          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if(!user) {
        return res.status(404).json({ email: 'Email does not exist' });
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            const { id, name } = user;
            const payload = { id, name };

            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              }
            )
          } else {
            return req.status(400).json({ password: 'Incorrect password' });
          }
        });
    });
});

module.exports = router;
