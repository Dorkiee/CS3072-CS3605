import jwt from 'jsonwebtoken'
import User from './userModel.js'

import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      console.log('value of req.user is ', req.user)
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }

})

const requireAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    const err = new Error("Not authorized as an admin");
    err.status = 401;
    next(err);
  }
});

const authMiddleware = {
  protect, 
  requireAdmin
}

export default authMiddleware;