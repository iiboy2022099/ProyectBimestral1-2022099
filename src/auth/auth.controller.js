import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generate-jwt.js';
import Cliente from '../client/client.model.js';
import Admin from '../admin/admin.model.js';

export const login = async (req, res) => {
    const { correo, password, role } = req.body;

    try {
        let usuario;

        if (role === 'CLIENT_ROLE') {
            usuario = await Cliente.findOne({ correo });

        } else if (role === 'ADMIN_ROLE') {
            usuario = await Admin.findOne({ correo });

        } else {
            return res.status(400).json({ msg: "Rol no válido" });
        }

        if (!usuario) {
            return res.status(400).json({ msg: "Credenciales incorrectas, correo no existe en la base de datos." });
        }

        if (!usuario.estado) {
            return res.status(400).json({ msg: "El usuario no está activo en la base de datos." });
        }

    const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({ msg: "La contraseña es incorrecta" });
        }

    const token = await generarJWT(usuario.id, role);

        res.status(200).json({
            msg: "Inicio de sesión exitoso",
            usuario,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};