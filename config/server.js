'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';
import adminRoutes from  '../src/admin/admin.routes.js';
import clienteRoutes from  '../src/client/client.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import categoriaRoutes from '../src/category/category.routes.js';
import productRoutes from '../src/products/products.routes.js';
import carritoRoutes from '../src/carrito/carrito.routes.js';


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.adminPath = '/ProyectSystem/v3/admin'
        this.clientePath = '/ProyectSystem/v3/cliente'
        this.authPath = '/ProyectSystem/v3/auth';
        this.categoriaPath = '/ProyectSystem/v3/categoria';
        this.productsPath = '/ProyectSystem/v3/productos';
        this.carritoPath =  '/ProyectSystem/v3/carrito';

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.adminPath, adminRoutes);
        this.app.use(this.clientePath, clienteRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.categoriaPath, categoriaRoutes);
        this.app.use(this.productsPath, productRoutes);
        this.app.use(this.carritoPath, carritoRoutes);

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;