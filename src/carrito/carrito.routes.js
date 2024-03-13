import { Router } from "express";
import { check } from "express-validator";
import { 
    carritoPosst,
    carritosGet
} from './carrito.controller.js';
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.get("/", carritosGet);

router.post(
    "/",
    [
        check('fecha', 'La fecha de la compra es obligatoria').not().isEmpty(),
        check('cantidad', 'La cantidad del producto para la compra es obligatorio').not().isEmpty(),
        check('estado', 'El estado para la compra es obligatorio').not().isEmpty(),
        check('products', 'El producto para la compra es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    carritoPosst
);

export default router;
