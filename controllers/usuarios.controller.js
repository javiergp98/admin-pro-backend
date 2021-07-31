const Usuario = require('../models/usuario.model');
const { response } = require('express');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const {generarJwt} = require('../helpers/jwt');


const getUsuarios = async (req, res) => {
    const desde = Number(req.query.desde) || 0;

    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email role google img').skip(desde).limit(5),
        Usuario.countDocuments()
    ]);
    res.json(
        {
            ok: true,
            usuarios,
            total
        }
    );
};

const crearUsuarios = async (req, res = response) => {
    const { email, password, nombre } = req.body;
    const usuario = new Usuario(req.body);

    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo electrónico existe'
            });
        }

        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        // Guardar usuario
        await usuario.save();

        // Generar token
        const token = await generarJwt(usuario.id);

        res.json(
            {
                ok: true,
                usuario,
                token
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...Revisar logs'
        });
    }
};

const actualizarUsuario = async(req,res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDb = await Usuario.findById(uid);

        if(!usuarioDb){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        const {password, google, email, ...campos} = req.body;

        if(usuarioDb.email !== email){
            const existeEmail = await Usuario.findOne({email});

            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        campos.email = email;
        // VALIDAR TOKEN

        // ACTUALIZAR
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos, {new:true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...Revisar logs'
        });
    }
};

const borrarUsuario = async (req,res = response) => {
    const uid = req.params.id;

    try {
        const usuarioDb = await Usuario.findById(uid);

        if(!usuarioDb){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: "Usuario eliminado"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...Revisar logs'
        });
    }
};

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}