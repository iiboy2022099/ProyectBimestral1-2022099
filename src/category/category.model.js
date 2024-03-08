import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema({

    categoryName: {
        type: String,
        required: [true, 'El nombre de la categoría es obligatorio']
    },

    description: {
        type: String,
        required: [true, 'La descripción de la categoría es obligatoria']
    },
    estado:{
        "type": Boolean,
        default: true
    }
});

export default mongoose.model('Category', CategorySchema);
