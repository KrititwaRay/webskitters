import mongoose from 'mongoose';


export class CategoryModel {
    constructor(){
        const schema = new mongoose.Schema({
            name: {
                type: String,
                required: true,
                unique:  true
            }
        },{ timestamps: true })
        this.Category = mongoose.model('Category', schema)
    }
}