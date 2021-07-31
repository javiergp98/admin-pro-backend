/*
    Médicos
    ruta: '/api/medicos'
*/

const {Router} = require('express');
const {getMedicos, crearMedico, actualizarMedico, borrarMedico} = require('../controllers/medicos.controller');
const {check} = require('express-validator');
const {validarCampos } = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validarJwt');

const router = Router();

router.get('/', getMedicos);
router.post('/',[
    validarJWT,
    check('nombre','El nombre del médico es necesario').not().isEmpty(),
    check('hospital','El id de hospital debe de ser válido').isMongoId(),
    validarCampos
], crearMedico);

router.put('/:id',actualizarMedico);

router.delete('/:id', borrarMedico);

module.exports = router;