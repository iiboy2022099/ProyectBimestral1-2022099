const { Schema, model } = require('mongoose');

const CategorySchema = Schema ({

    name: {
        type: String,
        required: [true, 'El nombre de la categoría es obligatorio']
    },

    description: {
        type: String,
        required: [true, 'La descripción de la categoría es obligatoria']
    },
    estado: {
        type: String,
        enum: ["activo", "inactivo"],
        default: "activo"
    }
});

module.exports = model('Category', CategorySchema);