import { QuestionModel } from "../model/question_model.js";
import mongoose from "mongoose";

export class QuestionController {
    constructor(){
        this._questionModel = new QuestionModel();
    }

    addQuestion = async( req, res) => {
        try {
            let { question, categoryId } = req.body;
            let newQuestion = await this._questionModel.Question.create({question, categoryId: categoryId});

            return res.status(201).json({ status: true, data: { _id: newQuestion._id }, message: "Question created successfully." })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }

    questionList = async (req, res) => {
        try {
            let list = await this._questionModel.Question.aggregate([
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'categoryId', 
                        foreignField: '_id',
                        as: 'categoryDetails' 
                    }
                },
                {
                    $unwind: '$categoryDetails' 
                },
                {
                    $project: {
                        question: 1, 
                        category: '$categoryDetails.name', 
                        category_id: '$categoryDetails._id' 
                    }
                },
                {
                    $group: {
                        _id: "$category_id",
                        category: { $first: "$category" }, 
                        questions: {
                            $push: "$question"
                        }
                    }
                }
            ]);

            return res.status(200).json({
                status: true,
                data: { list: list },
                message: "Questions retrieved successfully."
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }
    
}