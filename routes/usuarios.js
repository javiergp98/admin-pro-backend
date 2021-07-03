/**
 * RUTA: /api/usuarios
 */
const {Router} = require('express');
const {getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario} = require('../controllers/usuarios.controller');
const {check} = require('express-validator');
const {validarCampos } = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validarJwt');

const router = Router();

router.get('/',validarJWT, getUsuarios);
router.post('/',[
    check('nombre','Nombre obligatorio').not().isEmpty(),
    check('email', 'Email obligatorio').isEmail(),
    check('password','Contraseña obligatoria').not().isEmpty(),
    validarCampos
], crearUsuarios);

router.put('/:id', [
    validarJWT,
    check('nombre','Nombre obligatorio').not().isEmpty(),
    check('email', 'Email obligatorio').isEmail(),
    check('role','Role obligatorio').not().isEmpty(),
    validarCampos
],actualizarUsuario);

router.delete('/:id',[
    validarJWT
], borrarUsuario);

module.exports = router;