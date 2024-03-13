import Carrito from "./carrito.model.js";
import Producto from "../products/products.model.js";


export const carritoPosst = async (req, res) => {
    try {
        console.log(req.body);
        const { fecha, cantidad, estado, products } = req.body;

        let producto = await Producto.findOne({ nombre: products });

        if (!producto) {
            if (!products) {
                return res.status(400).json({ error: "El nombre del producto es obligatorio" });
            }

            producto = new Producto({ nombre: products });
            await producto.save();
        }

        const carrito = new Carrito({ fecha, cantidad, estado, products: producto._id });
        await carrito.save();

        res.status(200).json({ carrito });
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
    
    }
};



export const carritosGet = async(req, res)=>{
    try {
        const carritos = await Carrito.find()
        //retornar todos los valores
        return res.send({ carritos })
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'No Purchases or error Getting purchases'})
    }
}


