import { Router } from "express";
import { check } from "express-validator";
import {
    postCategory,
    getCategory
    } from "./category.controller.js";
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

    
export default router;