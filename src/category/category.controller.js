import { response, request } from "express";
import Categoria from './category.model.js';

export const postCategoria = async (req, res) => {
    const { categoryName, description } = req.body;
    const categoria = new Categoria({ categoryName, description });
    await categoria.save();
    res.status(200).json({
        categoria,
    });
}

export const getCategoria = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, categoria] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.status(200).json({
        total,
        categoria,
    });
}

export const putCategoria = async (req, res = response) => {
    const { id } = req.params;
    const { _id, categoryName,...rest } = req.body;
    await Categoria.findByIdAndUpdate(id, rest);
    const categoria= await Categoria.findOne({_id: id});
    res.status(200).json({
        msg: 'Categoria Actualizada',
        categoria,
    });

}

export const CategoriaDelete = async (req, res) => {
    const {id} = req.params;
    await Categoria.findByIdAndUpdate(id,{estado: false});

    const categoria = await Categoria.findOne({_id: id});

    res.status(200).json({
        msg: 'La Categoria a sido eliminada exitosamente',
        categoria
    });
}