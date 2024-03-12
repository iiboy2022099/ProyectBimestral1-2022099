
import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import Admin from './admin.model.js';


export const adminsGet = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, admins] = await Promise.all([
        Admin.countDocuments(query),
        Admin.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.status(200).json({
        total,
        admins,
    });
}
    
export const putAdmin = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, correo, nombre, ...resto } = req.body;

    if(password) {

        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    await Admin.findByIdAndUpdate(id, resto);

    const admin = await Admin.findOne({_id: id});

    res.status(200).json({
        msg: 'admin actualizado',
        admin
    })
    }

};

export const adminPost = async (req, res) => {
    
    const { nombre, correo, password, role } = req.body;
    const admin = new Admin({ nombre, correo, password, role });

    admin.role = 'ADMIN_ROLE';

    const salt = bcryptjs.genSaltSync();
    admin.password = bcryptjs.hashSync(password, salt);

    await admin.save();
    res.status(200).json({
        admin
    });
}
