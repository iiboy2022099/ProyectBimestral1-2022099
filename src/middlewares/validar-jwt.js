
import jwt from 'jsonwebtoken';
import Cliente from '../cliente/cliente.model.js';
import Admin from '../admin/admin.model.js';

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición",
        });
    }

    try {
        const { uid, role } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        if (role === 'CLIENT_ROLE') {
            const cliente = await Cliente.findById(uid);
            if (!cliente) {
                return res.status(401).json({
                    msg: 'Cliente no existe en la base de datos'
                });
            }
            if (!cliente.estado) {
                return res.status(401).json({
                    msg: 'Token no válido cliente no se encuentra'
                });
            }
            req.usuario = cliente;
        }

        if (role === 'ADMIN_ROLE') {
            const admin = await Admin.findById(uid);
            if (!admin) {
                return res.status(401).json({
                    msg: 'Admin no existe en la base de datos'
                });
            }
            if (!admin.estado) {
                return res.status(401).json({
                    msg: 'Token no válido admin no se encuentra'
                });
            }
            req.usuario = admin;
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido",
        });
    }
}
