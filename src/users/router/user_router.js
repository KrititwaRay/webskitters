import express from 'express';
const router = express.Router();
import { upload } from '../../helper/file_upload_middleware.js';

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
router.route('/signup').post(middleware, userController.signUp)

middleware = [
    userMiddleware.loginValidation(),
    commonMiddleware.checkForErrors
]
router.route('/login').post(middleware, userController.logIn)

middleware = [
    commonMiddleware.authenticationMiddleware,
    userMiddleware.viewUserProfileValidation(),
    commonMiddleware.checkForErrors
]
router.route('/view-profile').post(middleware, userController.viewUserProfile)


middleware = [
    commonMiddleware.authenticationMiddleware,
    upload.single('profilePicture'),
    userMiddleware.editUserProfileValidation(),
    commonMiddleware.checkForErrors
]
router.route('/edit-profile').post(middleware, userController.editUserProfile)




export const user_route = router;