import { validationResult } from "express-validator";

export class CommonMiddleware {

    checkForErrors = async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({ status: 400, data: { error: errors.array(), message: "Validation failed for one or more fields." } });

        } else {
            next()
        }
    }
}