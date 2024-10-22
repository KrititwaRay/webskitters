import mongoose from "mongoose";


export class QuestionModel {
    constructor(){
        const schema = new mongoose.Schema({
            question: {
                type: String,
                required: true
            },
            categoryId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category"
            }

        }, { timestamps: true })

        this.Question = mongoose.model('Question', schema)
    }
}