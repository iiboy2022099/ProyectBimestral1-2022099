import { Router } from "express";
import { check } from "express-validator";
import {
    postCategory,
    getCategory,
    putCategory
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
    
export default router;