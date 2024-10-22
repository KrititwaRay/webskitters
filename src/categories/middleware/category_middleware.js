import { check } from "express-validator";
export class CategoryMiddleware {


    addCategoryValidation(){
        return [
            check('name').trim().not().isEmpty().withMessage('Please provide category name').isString().withMessage('Please provide valid category name'),
        ]
    }

    categoryListValidation(){
        return [
            check('skip').trim().not().isEmpty().withMessage('Please provide skip'),
            check('limit').trim().not().isEmpty().withMessage('Please provide limit'),
        ]
    }

}