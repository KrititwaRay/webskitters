import { check } from "express-validator";


export class UserMiddleware {


    signupValidation() {
        return [
            check('username').trim().not().isEmpty().withMessage('Please provide username').isString().withMessage('Please provide valid username'),

            check('email').trim().not().isEmpty().withMessage('Pleaase provide email.').isEmail().withMessage('Please provide valid email.'),

            check('password').trim().not().isEmpty().withMessage('Pease provide password'),

            check('confirm_password').custom((val, { req }) => {
                if (!(val === req.body.password)) {
                    throw new Error('Passwords do not match.');
                }
                return true
            })
        ]
    }

    loginValidation() {
        return [
            check('email').trim().not().isEmpty().withMessage('Pleaase provide email.').isEmail().withMessage('Please provide valid email.'),
            check('password').trim().not().isEmpty().withMessage('Pease provide password')
        ]
    }

    viewUserProfileValidation() {
        return [
            check('id').trim().not().isEmpty().withMessage('Pleaase provide id.')
        ]
    }


    editUserProfileValidation() {
        return [
            check('id').trim().not().isEmpty().withMessage('Pleaase provide id.'),
            check('useranme').optional({ checkFalsy: true }).isString().withMessage('Please provide valid username'),
            check('email').optional({ checkFalsy: true }).isEmail().withMessage('Please provide valid email'),
            check('profilePicture').custom((val, { req }) => {
                if (!req.body || !req.file) return true
                let image_extension = ['jpg', 'jpeg', 'png', 'JPEG']
                let fileExtension = req.file.filename.split('.')[1];
                console.log(image_extension.includes(fileExtension))
                if (image_extension.includes(fileExtension)) {
                    return true
                } else {
                    throw new Error(`Please provide a valid file type. Allowed types are: ${image_extension.join(', ')}.`);
                }

            })
        ]
    }
}