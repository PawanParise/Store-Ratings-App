import express from 'express'
import { Login, Signup } from '../controller/auth.controller.js'
import { isAuthenticated } from '../middleware/auth.middleware.js'

const Router  =  express.Router()

Router.post('/sign-up',Signup)
Router.post('/login',Login)
Router.get("/is-login", isAuthenticated, (req, res) => {
  return res.json({
    success: true,
    user: req.user, // from middleware
  });
});

export {Router}