const jwt = require('jsonwebtoken');
const validarJWT = (req,res = response,next) => {
    // LEER EL TOKEN
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            ok:false,
            msg: 'No hay token en el header'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next();     
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token incorrecto'
        });
    }

};

module.exports= {
    validarJWT
}