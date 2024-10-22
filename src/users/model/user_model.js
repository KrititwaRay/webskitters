import mongoose from "mongoose";


export class UserModel {
    constructor(){
        const schema = new mongoose.Schema({
            username: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
                unique: true,
                lowercase: true
            },
            password: {
                type: String,
                required: true,
            },
            profilePicture: {
                type: String
            }

        },{ timestamps: true })


        this.User = mongoose.model('User', schema)
    }
}