import { check } from "express-validator";

export class QuestionMiddleware {

    addQuestionValidation(){
        return[
            check('question').trim().not().isEmpty().withMessage('Please provide question'),
            check('categoryId').trim().not().isEmpty().withMessage('Please provide category id').isString().withMessage('Please provide vaild category id.')
        ]
    }
    questionBulkInsertValidation(){
        return [
            check('question').custom((val, { req }) => {

                if (req.file) {
                    let image_extension = ['csv', 'CSV']
                    let fileExtension = req.file.filename.split('.')[1];
                    if (image_extension.includes(fileExtension)) {
                        return true
                    } else {
                        throw new Error(`Please provide a valid file type. Allowed types are: ${image_extension.join(', ')}.`);
                    }
                }else{
                    throw new Error(`Please provide a valid question file.`);
                }
            })
        ]
    }
}