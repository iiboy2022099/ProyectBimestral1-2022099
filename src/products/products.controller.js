
import { response, request } from 'express';
import Producto from './products.model.js';
import Categoria from '../category/category.model.js';



export const productoPost = async (req, res) => {

    const { nombre, precio, descripcion, categoria, cantidad } = req.body;

    let category = await Categoria.findOne({ categoryName: categoria });

    if (!category) {
        if (!categoria) {
            return res.status(400).json({ error: "El nombre de la categoría es obligatorio" });
        }

        category = new Categoria({ categoryName: categoria });
        await category.save();
    }

    const producto = new Producto({ nombre, precio, descripcion, categoria: category._id, cantidad });

    await producto.save();

    res.status(200).json({
        producto
    });
};

export const productsGet = async (req = request, res = response) => {

    const { limite, desde } = req.query;
    const query = { estado: true };

    const [ total, productos ] = await Promise.all([
        
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))     
    ]);

    res.status(200).json({
        total,
        productos
    });
}

export const putProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, descripcion, categoria, cantidad } = req.body;

    try {
        let category = await Categoria.findOne({ categoryName: categoria });

        if (!category) {
            if (!categoria) {
                return res.status(400).json({ error: "El nombre de la categoría es obligatorio" });
            }

            category = new Categoria({ categoryName: categoria });
            await category.save();
        }

        const producto = await Producto.findByIdAndUpdate(
            id,
            { nombre, precio, descripcion, categoria: category._id, cantidad },
            { new: true }
        );

        res.status(200).json({
            msg: 'Producto actualizado exitosamente',
            producto
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const productoDelete = async (req, res) => {
    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id, { estado: false });
    const productoAutenticado = req.producto;

    res.status(200).json({
        msg:'producto eliminado',
        producto,
        productoAutenticado
    });
};

export const obtenerInventario = async (req, res) => {
    try {
        const productos = await Producto.find();
        const inventario = {};

        productos.forEach(producto => {
            inventario[producto.nombre] = producto.cantidad;
        });
        res.status(200).json({ inventario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};


export const productosAgotados = async (req, res) => {
    try {
        const productosAgotados = await Producto.find({ cantidad: 0 });
        res.status(200).json({ productosAgotados });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const buscarProductosPorNombre = async (req, res) => {
    try {
        const { nombre } = req.query;
        const productosEncontrados = await Producto.find({ nombre: { $regex: new RegExp(nombre, 'i') } });
        res.status(200).json({ productosEncontrados });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};