const {response} = require('express');
const Usuario = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');
const {generarJwt} = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req, res = response) => {
    
    const token = req.body.token;
    try {
        const {name, email, picture} = await googleVerify(token);
        
        // Verificar si existe un usuario con ese email
        const usuarioDb = await Usuario.findOne({email});
        var usuario;

        if(!usuarioDb){
            usuario = new Usuario({
                nombre: name,
                email, 
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDb;
            usuario.google = true;
        }

        // Guardar en BDD
        await usuario.save();

        // Generar el JWT
        const nuevoToken = await generarJwt(usuario.id);

        res.json({
            ok: true,
            msg: 'Google SignIn',
            token: nuevoToken
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }
};

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    const token = await generarJwt(uid);

    res.json({
        ok: true,
        uid,
        token
    });
};

module.exports = {
    login,
    googleSignIn,
    renewToken
}