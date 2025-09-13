import express from 'express'
import { Login, Signup, GetUsers , AddStore, GetStores, UpdateUser, DeleteUser, DeleteStore, changePassword, AddRating, GetRating, GetUserRating} from '../controller/auth.controller.js'
import { isAuthenticated } from '../middleware/auth.middleware.js'

const Router  =  express.Router()

Router.post('/sign-up',Signup)
Router.post('/login',Login)
Router.get('/get-users',GetUsers)
Router.get('/get-stores',GetStores)
Router.post('/add-store',AddStore)
Router.put('/edit-user/:id',UpdateUser)
Router.delete('/delete-user/:userId',DeleteUser)
Router.delete('/delete-store/:storeId',DeleteStore)
Router.put('/change-password/:id',changePassword)
Router.post('/add-rating/:id',isAuthenticated,AddRating)
Router.get('/user-ratings',isAuthenticated,GetUserRating)
Router.get('/get-ratings',GetRating)
Router.get("/is-login", isAuthenticated, (req, res) => {
  return res.json({
    success: true,
    user: req.user, // from middleware
  });
});

export {Router}