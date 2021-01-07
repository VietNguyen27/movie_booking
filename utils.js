var jwt = require('jsonwebtoken');

function generateToken(user) {
  if (!user) return null;

  var u = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
    isAdmin: false,
  };

  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24,
  });
}

function getCleanUser(user) {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
    isAdmin: false,
  };
}

module.exports = {
  generateToken,
  getCleanUser,
};
