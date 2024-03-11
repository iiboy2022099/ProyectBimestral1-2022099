import { Router } from "express";
import { check } from "express-validator";
import {
    postCategory,
    getCategory,
    putCategory,
    CategoryDelete
    } from "./category.controller.js";
    import {
        existeCategoriaById
    }from "../helpers/db-validators.js";
    import { validarCampos } from "../middlewares/validar-campos.js";

    const router = Router();

    router.get("/", getCategory);

    router.post(
        "/", [
            check("categoryName", "The username is required").not().isEmpty(),
            check("description", "The username is required").not().isEmpty(),
            validarCampos,
        ],postCategory
    );
    
    router.put(
        "/:id",
        [
            check("id", "No es un ID valido").isMongoId(),
            check("id").custom(existeCategoriaById),
            validarCampos,
        ],
        putCategory
    );

    router.delete(
        "/:id",
        [
            check("id", "El id no es un formato válido de MongoDB").isMongoId(),
            check("id").custom(existeCategoriaById),
            validarCampos
        ], CategoryDelete);
    
    
    
export default router;