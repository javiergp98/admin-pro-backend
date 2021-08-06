/**
 * RUTA: /api/hospitales
 */
const {Router} = require('express');
const {getHospitales, crearHospital, actualizarHospital, borrarHospital} = require('../controllers/hospitales.controller');
const {check} = require('express-validator');
const {validarCampos } = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validarJwt');

const router = Router();

router.get('/', getHospitales);
router.post('/',[
    validarJWT,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
], crearHospital);

router.put('/:id',[
    validarJWT,
    check('El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
],actualizarHospital);

router.delete('/:id',[
    validarJWT
],borrarHospital);

module.exports = router;