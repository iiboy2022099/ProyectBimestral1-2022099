import { Router } from "express";
import { check } from "express-validator";

import {

    clientePost,
    clientesGet

}from './client.controllet.js';

import { existenteEmail,esRoleValido,existeUsuarioById,} 
from "../helpers/db-validators.js";
  
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.get("/", clientesGet);

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
    ],clientePost);

export default router;