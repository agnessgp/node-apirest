const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');

let rolesValidos = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol válido.'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre:{
        type:String,
        required: [true, 'EL NOMBRE ES NECESARIO']
    },
    email:{
        type:String,
        unique: true,
        required: [true, 'EL EMAIL ES NECESARIO']
    },
    password:{
        type:String,
        required: [true, 'EL PASSWORD ES NECESARIO']
    },
    img:{
        type:String,
        required: false
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado:{
        type: Boolean,
        default: true

    },
    google:{
        type: Boolean,
        default: false
    }

});

usuarioSchema.methods.toJSON = function (){
    let user = this;
    let userObject = user.toObject();

    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {message : '{PATH} debe de ser único.'})

module.exports = mongoose.model('Usuario', usuarioSchema);