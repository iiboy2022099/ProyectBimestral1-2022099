

export const tieneRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Se quiere verificar un role sin validar el token primero'
            });
        }
        let rolUsuario;

        if (req.user.role === 'CLIENT_ROLE') {
            rolUsuario = 'cliente';
        }

        if (req.user.role === 'ADMIN_ROLE ') {
            rolUsuario = 'admin';
        }

        if (!roles.includes(rolUsuario)) {
            return res.status(401).json({
                msg: `Usuario no autorizado, posee un rol ${rolUsuario}, los roles autorizados son ${roles}`
            });
        }

        next();
    };
};