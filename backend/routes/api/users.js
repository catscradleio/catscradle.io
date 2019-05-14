const express = require('express');
const user = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const User = require('../../models/User');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

user.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  const { handle, email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if(user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      }

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

user.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if(!user) {
        errors.email = 'Email does not exist';
        return res.status(404).json(errors);
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
            return res.status(400).json({ password: 'Incorrect password' });
          }
        });
    });
});

user.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, handle, email } = req.user;
  res.json({ id, handle, email });
});

module.exports = user;
