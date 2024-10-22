import express from 'express';
const router = express.Router();
import { upload } from '../../helper/file_upload_middleware.js';

import { QuestionController } from '../controller/question_controller.js';
const questionController = new QuestionController();

//question middleware
import { QuestionMiddleware } from '../middleware/question_middleware.js';
const questionMiddleware = new QuestionMiddleware();


//common middleware
import { CommonMiddleware } from '../../helper/common_middleware.js';
const commonMiddleware = new CommonMiddleware()

let middleware = []


middleware = [
    commonMiddleware.authenticationMiddleware,
    questionMiddleware.addQuestionValidation(),
    commonMiddleware.checkForErrors
]
router.route('/create').post(middleware, questionController.addQuestion)


middleware = [
    commonMiddleware.authenticationMiddleware,
]
router.route('/list').post(middleware, questionController.questionList)

middleware = [
    commonMiddleware.authenticationMiddleware,
    upload.single('question'),
    questionMiddleware.questionBulkInsertValidation(),
    commonMiddleware.checkForErrors
]
router.route('/bulk-insert').post(middleware, questionController.questionBulkInsert)



export const question_router = router;