const {response} = require('express');
const Medico = require('../models/medico.model');

const getMedicos = async (req, res = response) => {
    const medicos = await Medico.find().populate('hospital','nombre').populate('usuario','nombre');
    res.json(
        {
            ok: true,
            medicos
        }
    );
};

const crearMedico = async (req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario:uid,
        ...req.body
    });

    try {
        const medicoDb = await medico.save();

        res.json(
            {
                ok: true,
                medico: medicoDb
            }
        );
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Hable con el admin'
        });
    }
};

const actualizarMedico = async (req, res = response) => {
    res.json(
        {
            ok: true,
            msg: 'actualizarMedico'
        }
    );
};
const borrarMedico = async (req, res = response) => {
    res.json(
        {
            ok: true,
            msg: 'borrarMedico'
        }
    );
};
module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}