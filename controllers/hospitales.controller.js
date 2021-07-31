const {response} = require('express');
const Hospital = require('../models/hospital.model');

const getHospitales = async (req, res = response) => {
    const hospitales = await Hospital.find().populate('usuario','nombre img');

    res.json(
        {
            ok: true,
            hospitales
        }
    );
};

const crearHospital = async (req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({
        usuario:uid,
        ...req.body
    });

    try {
        const hospitalDb = await hospital.save();

        res.json(
            {
                ok: true,
                hospital: hospitalDb
            }
        );
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Hable con el admin'
        });
    }
};

const actualizarHospital = async (req, res = response) => {
    res.json(
        {
            ok: true,
            msg: 'actualizarHospital'
        }
    );
};
const borrarHospital = async (req, res = response) => {
    res.json(
        {
            ok: true,
            msg: 'borrarHospital'
        }
    );
};
module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}