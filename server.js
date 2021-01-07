require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 4000;

let users = [];

axios
  .get('http://localhost:5000/users')
  .then((res) => (users = res.data))
  .catch((error) => console.log(error));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  var token = req.headers['authorization'];
  if (!token) return next();

  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: 'Người dùng không hợp lệ.',
      });
    } else {
      req.user = user;
      next();
    }
  });
});

app.get('/', (req, res) => {
  if (!req.user)
    return res
      .status(401)
      .json({ success: false, message: 'Người dùng không hợp lệ.' });
  res.send('Xin chào - ' + req.user.name);
});

app.post('/users/signin', function (req, res) {
  const email = req.body.email;
  const pwd = req.body.password;
  const userDetails = users.find((u) => u.email === email) || [];
  const token = utils.generateToken(userDetails);
  const userObj = utils.getCleanUser(userDetails);

  if (!email || !pwd) {
    return res.status(400).json({
      error: true,
      message: 'Vui lòng điền email và mật khẩu.',
    });
  }

  if (userDetails.isAdmin) {
    return res.json({ user: { ...userObj, isAdmin: true }, token });
  }

  if (email !== userDetails.email || pwd !== userDetails.password) {
    return res.status(401).json({
      error: true,
      message: 'Email hoặc mật khẩu không hợp lệ.',
    });
  }

  return res.json({ user: userObj, token });
});

app.get('/verifyToken', function (req, res) {
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: 'Token is required.',
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err)
      return res.status(401).json({
        error: true,
        message: 'Invalid token.',
      });

    if (user.id !== userData.id) {
      return res.status(401).json({
        error: true,
        message: 'Invalid user.',
      });
    }
    var userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
  });
});

app.listen(port, () => {
  console.log('Server started on: ' + port);
});
