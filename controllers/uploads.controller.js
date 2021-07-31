const path = require('path');
const fs = require('fs');
const {response} = require('express');
const {v4:uuidv4} = require('uuid');
const { actualizarImagen } = require('../helpers/actualizarImagen');

const showImg = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    let pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    // IMG POR DEFECTO
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        pathImg = path.join(__dirname, `../uploads/no-img-available.png`);
        res.sendFile(pathImg);
    }

};

const fileUpload  = (req,res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales','medicos','usuarios'];
    
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: 'Tipo no admitido'
        });
    }

    // Validar que exista un archivo
    if(!req.files ||Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok: false,
            msg: 'No se ha encontrado el archivo'
        });
    }

    // Procesar una imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1].toLowerCase();

    // Validar extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];

    if(!extensionesValidas.includes(extension)){
        return res.status(400).json({
            ok: false,
            msg: 'Extensión no admitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extension}`;

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, (err) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
        console.log('ID USER: ', id);

        // Actualizar BBDD
        actualizarImagen(tipo,id,nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });
};

module.exports = {
    showImg,
    fileUpload
}