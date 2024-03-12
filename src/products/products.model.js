import mongoose from "mongoose";

const ProductoSchema = mongoose.Schema ({
   
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio']
    },

    precio: {
        type: Number,
        required: [true, 'El precio del producto es obligatorio']
    },

    descripcion: {
        type: String,
        require: [true, 'pon la descripcion del producto']
    },
    
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'La categoría del producto es obligatoria']
    },
    
    cantidad: {
        type: String,
        require: [true, 'se necesita saber si esta disponible']
    },

    estado: {
        type: Boolean,
        default: true
    }

});

export default mongoose.model('Producto', ProductoSchema)