const express = require('express');
const router = express.Router();
const User = require('../items/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
 
router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const user = new User({
        username: req.body.username,
        password: hash
      });
      user
        .save()
        .then(() => res.status(201).json({ info: 'Utworzono nowego użytkownika' }))
        .catch((err) => res.status(500).json(err));
    });
  });

router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username }).then((user) => {
      if (!user)
        return res.status(401).json({ info: 'Błąd autoryzacji, niepoprawne dane' });
      bcrypt.compare(req.body.password, user.password).then((result) => {
        if (!result) return res.status(401).json({ info: 'Błąd autoryzacji, niepoprawne dane' });
        const token = jwt.sign({username: user.username}, process.env.JWT_KEY, {expiresIn: '1h'});
        return res.status(200).json({token});
      });
    })
    .catch((err) => res.status(500).json(err));
  });

module.exports = router;