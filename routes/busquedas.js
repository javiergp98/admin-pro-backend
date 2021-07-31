/**
 * 
 * ruta: api/todo/:busqueda
 */

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos } = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validarJwt');
const {getTodo, getDocsCol} = require('../controllers/busquedas.controller');

const router = Router();

router.get('/:busqueda',[validarJWT], getTodo);
router.get('/coleccion/:tabla/:busqueda',[validarJWT], getDocsCol);

module.exports = router;