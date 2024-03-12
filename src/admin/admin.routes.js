import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import{

    adminPost,
    adminsGet,
    putAdmin

} from "./admin.controller.js";

import { existenteEmail,esRoleValido,existeUsuarioById,} 
from "../helpers/db-validators.js";
  

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

export default router;