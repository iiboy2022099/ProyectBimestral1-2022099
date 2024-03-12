import { Router } from "express";
import { check } from "express-validator";
import{

    adminPost,
    adminsGet,
    putAdmin,
    admindelete

} from "./admin.controller.js";

import { existenteEmail,esRoleValido,existeUsuarioById,} 
from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", adminsGet);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({
            min: 6,
        }),
    
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),    
        validarCampos,
    ],adminPost);

    router.put(
        "/:id",
        [
            check("id", "This is not a valid ID").isMongoId(),
            check("id").custom(existeUsuarioById),
            validarCampos,
        ],
        putAdmin
    
    );
    router.delete(
        "/:id",
        [
          validarJWT,
          check("id", "No es un ID válido").isMongoId(),
          check("id").custom(existeUsuarioById),
          validarCampos,
        ],
        admindelete
      );
    

export default router;