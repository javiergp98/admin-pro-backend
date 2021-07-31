const {response} = require('express');
const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');

// GET TODO
const getTodo = async(req,res = response) => {
    const busqueda = req.params.busqueda || "";
    const regex = new RegExp(busqueda,'i');

    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({nombre: regex}),
        Hospital.find({nombre: regex}),
        Medico.find({nombre: regex})
    ]);
    // const usuarios = await Usuario.find({nombre: regex});
    // const hospitales = await Hospital.find({nombre: regex});
    // const medicos = await Medico.find({nombre: regex});

    return res.json({
        ok: true,
        busqueda,
        usuarios,
        hospitales,
        medicos
    });
};

const getDocsCol = async(req,res = response) => {
    const busqueda = req.params.busqueda || "";
    const tabla = req.params.tabla || "";
    const regex = new RegExp(busqueda,'i');
    let resultados;
    
    switch(tabla){
        case 'usuarios':
        resultados = await Usuario.find({nombre: regex});
            break;
        case 'hospitales':
            resultados = await Hospital.find({nombre: regex}).populate('usuario','nombre img');
            break; 
        case 'medicos':
            resultados = await Medico.find({nombre: regex}).populate('usuario','nombre img').populate('hospital','nombre img');
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla no corresponde a ninguna colección'
            });
            break;
    }

    return res.json({
        ok: true,
        resultados  
    });
}

module.exports = {
    getTodo,
    getDocsCol
};