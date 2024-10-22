import { check } from "express-validator";

export class QuestionMiddleware {

    addQuestionValidation(){
        return[
            check('question').trim().not().isEmpty().withMessage('Please provide question'),
            check('categoryId').trim().not().isEmpty().withMessage('Please provide category id').isString().withMessage('Please provide vaild category id.')
        ]
    }
}