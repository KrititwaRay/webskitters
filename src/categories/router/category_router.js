import express from 'express';
const router = express.Router();

import { CategoryController } from '../controller/category_controller.js';
const categoryController = new CategoryController();

import { CategoryMiddleware } from '../middleware/category_middleware.js';
const categoryMiddleware = new CategoryMiddleware();

// common middleware
import { CommonMiddleware } from '../../helper/common_middleware.js';
const commonMiddleware = new CommonMiddleware()

let middleware = []

middleware = [
    commonMiddleware.authenticationMiddleware,
    categoryMiddleware.addCategoryValidation(),
    commonMiddleware.checkForErrors
]
router.route('/add').post(middleware, categoryController.addCategory)

middleware = [
    commonMiddleware.authenticationMiddleware,
    categoryMiddleware.categoryListValidation(),
    commonMiddleware.checkForErrors
]
router.route('/list').post(middleware, categoryController.categoryList)

export const category_route = router;