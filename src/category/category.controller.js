import { response, request } from "express";
import Category from './category.model.js';

export const postCategory = async (req, res) => {
    const { categoryName, description } = req.body;
    const category = new Category({ categoryName, description });
    await category.save();
    res.status(200).json({
        category,
    });
}

export const getCategory = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, categorys] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.status(200).json({
        total,
        categorys,
    });
}

export const putCategory = async (req, res = response) => {
    const { id } = req.params;
    const { _id, categoryName,...rest } = req.body;
    await Category.findByIdAndUpdate(id, rest);
    const category= await Category.findOne({_id: id});
    res.status(200).json({
        msg: 'Categoria Actualizada',
        category,
    });

}



