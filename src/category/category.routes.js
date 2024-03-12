import { Router } from "express";
import { check } from "express-validator";
import {
    postCategoria,
    getCategoria,
    putCategoria,
    CategoriaDelete
    } from "./category.controller.js";
    import {
        existeCategoriaById
    }from "../helpers/db-validators.js";
    import { validarCampos } from "../middlewares/validar-campos.js";
    import { validarJWT } from "../middlewares/validar-jwt.js";

    const router = Router();

    router.get("/", getCategoria);

    router.post(
        "/", [
            check("categoryName", "The username is required").not().isEmpty(),
            check("description", "The username is required").not().isEmpty(),
            validarCampos,
        ],postCategoria
    );
    router.put(
        "/:id",
        [
            validarJWT,
            check("id", "No es un ID valido").isMongoId(),
            check("id").custom(existeCategoriaById),
            validarCampos,
        ],
        putCategoria
    );

    router.delete(
        "/:id",
        [
            validarJWT,
            check("id", "El id no es un formato válido de MongoDB").isMongoId(),
            check("id").custom(existeCategoriaById),
            validarCampos
        ], CategoriaDelete);
    
    export default router;