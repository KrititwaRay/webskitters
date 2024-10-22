import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


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
                type: String,
                default: ''
            }

        },{ timestamps: true })

        schema.pre('save', async function (next) {
            if(!this.isModified('password')) return next();

            this.password = await bcrypt.hash(this.password, 10);

            next();
        })

        schema.methods.generateAccessToken = async function(){
            const secret = process.env.ACCESS_TOKEN_SECRET || 'jbfakj%NCasA#cjcn';
            return jwt.sign({ _id: this._id, email: this.email }, secret ,{ expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d' })
        }


        this.User = mongoose.model('User', schema)
    }
}