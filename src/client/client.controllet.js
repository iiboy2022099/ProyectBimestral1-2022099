import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import Cliente from './client.model.js';


export const clientesGet = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, clientes] = await Promise.all([
        Cliente.countDocuments(query),
        Cliente.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.status(200).json({
        total,
        clientes,
    });
}
    
export const putCliente = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, correo, nombre, ...resto } = req.body;

    if(password) {

        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    await Cliente.findByIdAndUpdate(id, resto);

    const cliente = await Cliente.findOne({_id: id});

    res.status(200).json({
        msg: 'cliente actualizado',
        cliente
    })
    }

};

export const clientePost = async (req, res) => {
    
    const { nombre, correo, password, role } = req.body;
    const cliente = new Cliente({ nombre, correo, password, role });

    cliente.role = 'CLIENT_ROLE';

    const salt = bcryptjs.genSaltSync();
    cliente.password = bcryptjs.hashSync(password, salt);

    await cliente.save();

    res.status(200).json({
        cliente
    });
    
}