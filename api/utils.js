function requireUser(req, res, next) {
  if (!req.user) {
    const error = new Error('Unauthorized');
    error.status = 401;
    return next(error);
  }
  
  next();
}

module.exports = {
  requireUser
}
