import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import { UserModel } from "../users/model/user_model.js";

export class CommonMiddleware {

    constructor(){
        this._userModel = new UserModel();
    }

    checkForErrors = async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 400, data: { error: errors.array(), message: "Validation failed for one or more fields." } });

        } else {
            next()
        }
    }



    authenticationMiddleware = async (req, res, next) => {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');
        const secret = process.env.ACCESS_TOKEN_SECRET || 'jbfakj%NCasA#cjcn';
        if (!token) {
            return res.status(401).json({ status: false, message: "Unauthorized request." })
        }

        const decodeToken = await jwt.verify(token, secret)

        let user = await this._userModel.User.findById(decodeToken?._id).select("-password")

        req.user = user;
        next();
    }

    // isAuthorized = () => {
    //     return (req, res, next) => {
    //         if(req.user._id != req.body.id){
                
    //             return res.status(403).json({status: false, message: "You are not allowed to Edit this profile."})
    //         }
    //         next();
    //     }
    // }
}