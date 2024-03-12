import { Router } from "express";
import { check } from "express-validator";

import {

    productoPost,
    productsGet,
    putProducto,
    productoDelete,
    obtenerInventario,
    productosAgotados

}from './products.controller.js';
import { existeProductsById } from "../helpers/db-validators.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";


const router = Router();

router.get("/", productsGet);

router.get("/inventario", obtenerInventario);

router.get("/productosAgotados", productosAgotados);

router.post(
    "/",
    [
        validarJWT,
        check('nombre', 'el nombre del producto es obligatorio').not().isEmpty(),
        check('precio', 'el precio del producto es obligatorio').not().isEmpty(),
        check('descripcion', 'la descripción del producto es obligatoria').not().isEmpty(),
        check('categoria','la categoria es obligatoria').not().isEmpty(),
        check('cantidad', 'la disponibilidad del producto es obligatoria').not().isEmpty(),

        validarCampos,
    ],
    productoPost
);

router.put(
    "/:id",
    [
      check("id", "No es un ID válido").isMongoId(),
      check("id").custom(existeProductsById),
      validarCampos,
    ],
    putProducto
  );

  router.delete(
    "/:id",
    [
      validarJWT,
      check("id", "No es un ID válido").isMongoId(),
      check("id").custom(existeProductsById),
      validarCampos,
    ],
    productoDelete
);

export default router;