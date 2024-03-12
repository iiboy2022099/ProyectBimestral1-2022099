import Role from '../role/role.model.js';
import Admin from '../admin/admin.model.js';
import Cliente from '../client/client.model.js';
import Categoria from '../category/category.model.js';

export const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if (!existeRol){
        throw new Error(`El role ${role} no existe en la base de datos`);
    }
}

export const existenteEmail = async (correo = '') => {
    const existeEmailAdmin = await Admin.findOne({correo});
    const existeEmailCliente = await Cliente.findOne({correo});
    
    if (existeEmailAdmin || existeEmailCliente){
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}


export const existeUsuarioById = async (id = '') => {
    const existeUsuarioAdmin = await Admin.findById(id);
    const existeUsuarioCliente = await Cliente.findById(id);
    
    if (!existeUsuarioAdmin && !existeUsuarioCliente){
        throw new Error(`El ID: ${id} no existe`);
    }
}

export const existeCategoriaById = async (id = '') => {
    const existeCategoria = await Categoria.findById(id);
    
    if (!existeCategoria){
        throw new Error(`El ID: ${id} no existe`);
    }
}

