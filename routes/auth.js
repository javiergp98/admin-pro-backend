/**
 * RUTA: /api/login
 */
const {Router} = require('express');
const {check} = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJwt');
const router = Router();


router.get('/renew',
    validarJWT,
    renewToken
);

router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
], login);


router.post('/google',[
    check('token', 'El token Google es obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;