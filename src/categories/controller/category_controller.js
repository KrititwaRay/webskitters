import { CategoryModel } from "../model/category_model.js";


export class CategoryController {
    constructor() {
        this._categoryModel = new CategoryModel();
    }

    addCategory = async (req, res) => {
        try {
            let newCategory = await this._categoryModel.Category.create({ name: req.body.name });

            return res.status(500).json({
                status: true,
                data: {
                    _id: newCategory._id
                },
                message: 'Category added successfully.'
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }

    categoryList = async (req, res) => {
        try {
            let lsit = await this._categoryModel.Category.aggregate([
                {
                    $project: {
                        name: 1
                    }
                },
                {
                    $skip: req.body.skip
                },
                {
                    $limit: req.body.limit
                }
            ]);

            return res.status(500).json({
                status: true,
                data: {
                    categories: lsit
                },
                message: 'Category list fetched successfully.'
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }
}