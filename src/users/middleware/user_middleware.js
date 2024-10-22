import { check } from "express-validator";


export class UserMiddleware {


    signupValidation() {
        return [
            check('username').trim().not().isEmpty().withMessage('Please provide username').isString().withMessage('Please provide valid username'),

            check('email').trim().not().isEmpty().withMessage('Pleaase provide email.').isEmail().withMessage('Please provide valid email.'),

            check('password').trim().not().isEmpty().withMessage('Pease provide password'),

            check('confirm_password').custom((val,{req}) => {
                if(!(val === req.body.password)){
                    throw new Error('Passwords do not match.');
                }
                return true
            })
        ]
    }
}