const config = require('config')
const jwt = require('jsonwebtoken')
const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
};

function auth (req, res, next)   {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorizaton denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
 
};



const isAdmin = (req, res, next) => {
  console.log(req.user)
  if ( req.user &&  req.user.isAdmin) {
    return next();
  }
  return res.status(401).send("this your req" +req.user.email )
}

 
module.exports= {
    isAdmin,auth, getToken
}