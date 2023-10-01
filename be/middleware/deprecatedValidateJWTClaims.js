validateJwtClaims;
const validateJwtClaims = (req, res, next) => {
  const decodedToken = req.decodedToken; // Assuming you have a decoded token attached to the request

  if (!decodedToken) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Validate userId
  if (!decodedToken.userId || typeof decodedToken.userId !== 'string') {
    return res.status(401).json({ error: 'Invalid userId' });
  }

  // Validate email
  if (!decodedToken.email || typeof decodedToken.email !== 'string') {
    return res.status(401).json({ error: 'Invalid email' });
  }

  // Validate role
  if (!decodedToken.role || typeof decodedToken.role !== 'string') {
    return res.status(401).json({ error: 'Invalid role' });
  }

  // Validate iss (issuer)
  if (decodedToken.iss !== process.env.ISSUER) {
    // Using environmental variable
    return res.status(401).json({ error: 'Invalid issuer' });
  }

  // Validate aud (audience)
  if (decodedToken.aud !== process.env.AUDIENCE) {
    // Using environmental variable
    return res.status(401).json({ error: 'Invalid audience' });
  }

  // Validate auth_time
  if (!decodedToken.auth_time || typeof decodedToken.auth_time !== 'number') {
    return res.status(401).json({ error: 'Invalid auth_time' });
  }

  // Validate sub (subject, typically the user id or email)
  if (!decodedToken.sub || typeof decodedToken.sub !== 'string') {
    return res.status(401).json({ error: 'Invalid subject' });
  }

  // Validate iat (issued at)
  if (!decodedToken.iat || typeof decodedToken.iat !== 'number') {
    return res.status(401).json({ error: 'Invalid issued at time' });
  }

  // Validate exp (expiration time)
  if (!decodedToken.exp || typeof decodedToken.exp !== 'number') {
    return res.status(401).json({ error: 'Invalid expiration time' });
  }

  // Check if the token has expired
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  if (decodedToken.exp < currentTime) {
    return res.status(401).json({ error: 'Token has expired' });
  }

  next();
};

module.exports = validateJwtClaims;
