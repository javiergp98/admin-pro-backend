const {response} = require('express');
const Usuario = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');
const {generarJwt} = require('../helpers/jwt');

const login = async (req, res = response) => {
    try {
        const {email, password} = req.body;
        const usuarioDb = await Usuario.findOne({email});

        if(!usuarioDb){
            return res.status(400).json({
                ok:false,
                msg: 'Email no válido'
            });
        }

        // VERIFICAR CONTRASEÑA
        const validPassword = bcryptjs.compareSync(password, usuarioDb.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Contraseña no válida'
            });
        }

        // Generar TOKEN
        const token = await generarJwt(usuarioDb.id);

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Contact admin.'
        });
    }
};

module.exports = {
    login
}