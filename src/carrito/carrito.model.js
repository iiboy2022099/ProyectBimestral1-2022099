import mongoose from 'mongoose';

const CarritoSchema = mongoose.Schema ({
    fecha: {
        type: Date,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'completado', 'cancelado'],
        default: 'pendiente'
    },
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: [true, 'El producto es obligatorio']
    }]
});

export default mongoose.model('Carrito', CarritoSchema);
