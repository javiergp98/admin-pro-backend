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

    const id = req.params.id;
    const uid = req.uid;

    try {
        const medico = await Medico.findById(id);

        if(!medico){
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            });
        }

        medico.nombre = req.body.nombre;
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        };

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true});

        res.json(
            {
                ok: true,
                msg: 'actualizarMedico',
                medico: medicoActualizado
            }
        );
    } catch (error) {
        res.status(500).json(
            {
                ok: false,
                msg: 'Hable con el admin'
            }
        );
    }
};

const borrarMedico = async (req, res = response) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById(id);

        if(!medico){
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json(
            {
                ok: true,
                msg: 'Médico eliminado'
            }
        );
    } catch (error) {
        res.status(500).json(
            {
                ok: false,
                msg: 'Hable con el admin'
            }
        );
    }
};
module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}