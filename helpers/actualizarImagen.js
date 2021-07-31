const fs = require('fs');

const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const borrarImagen = (path) => {
    if(fs.existsSync(path)){
        // BORRAR LA IMAGEN ANTERIOR
        fs.unlinkSync(path);
    }
};

const actualizarImagen = async function(tipo, id, nombreArchivo){
    switch(tipo){
        case 'medicos':
            const medico = await Medico.findById(id);

            if(!medico){
                console.log('no es un médico por id');
                return false;
            }

            const pathOld = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathOld);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);

            if(!hospital){
                console.log('no es un hospital por id');
                return false;
            }

            const pathOld2 = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathOld2);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);

            if(!usuario){
                console.log('no es un usuario por id');
                return false;
            }

            const pathOld3 = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathOld3);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
    }
};

module.exports = {
    actualizarImagen
}