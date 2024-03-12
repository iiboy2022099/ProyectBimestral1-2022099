import mongoose from "mongoose";

const ClienteSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre del cliente es obligatorio']
    },

    correo: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio']
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    role: {
        type: String,
        default: "CLIENT_ROLE"
    },

    estado: {
        type: Boolean,
        default: true
    }
});

ClienteSchema.methods.toJSON = function () {
    const { __v, password, _id, ...cliente } = this.toObject();
    cliente.uid = _id;
    return cliente
}


export default mongoose.model('Cliente', ClienteSchema);