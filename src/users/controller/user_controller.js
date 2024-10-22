import { UserModel } from "../model/user_model.js";


export class UserController {
    constructor() {
        this._userModel = new UserModel();
    }

    signUp = async (req, res) => {
        try {
            const { username, email, password, confirm_password } = req.body;

            let userExists = await this._userModel.User.aggregate([
                { $match: { email: email } },
                { $count: "userCount" }
            ]);

            const isUserExist = userExists.length > 0 && userExists[0]?.userCount > 0

            if (isUserExist) {
                return res.status(409).json({
                    status: false,
                    data: {}, 
                    message: "A user with the provided credentials already exists. Please try another email."
                })
            }
            let { _id } = await this._userModel.User.create({
                username, email, password
            });

            return res.status(201).json({ status: true, data: { _id }, message: "Signup successful." })

        } catch (error) {
            return res.status(500).json({ status: false, message: error.message })
        }
    }
}