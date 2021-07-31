/**
 * 
 * ruta: api/uploads/
 */
 const expressFileUpload = require('express-fileupload');
 const {Router} = require('express');
 const {validarJWT} = require('../middlewares/validarJwt');
 const {fileUpload, showImg} = require('../controllers/uploads.controller');

 const router = Router();
 router.use(expressFileUpload());

 router.get('/:tipo/:foto',validarJWT, showImg);
 router.put('/:tipo/:id',validarJWT, fileUpload);

 module.exports = router;