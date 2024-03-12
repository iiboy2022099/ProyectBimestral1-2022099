import mongoose from 'mongoose';

const AdminSchema = mongoose.Schema ({
    
    nombre: {
    
        type: String,
        required: [true, 'El nombre del administrador es obligatorio']
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
        ref: "ADMIN_ROLE",
    },
    
    estado: {
    
        type: Boolean,
        default: true
    }
});

AdminSchema.methods.toJSON = function(){
    const { __v, password, _id, ...admin } = this.toObject();
    admin.uid = _id;
    return admin;
}

export default mongoose.model('Admin', AdminSchema);