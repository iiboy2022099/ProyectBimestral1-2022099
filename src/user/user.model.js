import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
 
        name: {
          type: String,
          required: [true, "El nombre es obligatorio"],
        },
        email: {
          type: String,
          required: [true, "El correo es obligatorio"],
          unique: true,
        },
        password: {
          type: String,
          required: [true, "La contraseña es obligatoria"],
        },
        role: {
          type: String,
          required: true,
          enum : ["ADMIN_ROLE", "CLIENT_ROLE"],
        },
        estado: {
          type: Boolean,
          default: true,
        }

    });

   

export default mongoose.model('User', UserSchema);