import express from 'express';
const router = express.Router();


import { UserController } from '../controller/user_controller.js';
const userController = new UserController();

// validation middleware
import { UserMiddleware } from '../middleware/user_middleware.js';
const userMiddleware = new UserMiddleware();

//common middleware
import { CommonMiddleware } from '../../helper/common_middleware.js';
const commonMiddleware = new CommonMiddleware();



let middleware = []

middleware = [
    userMiddleware.signupValidation(),
    commonMiddleware.checkForErrors
]
router.route('/sign-up').post(middleware, userController.signUp)




export const user_route = router;