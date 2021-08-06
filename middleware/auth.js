const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    //autorizacion por el header
    const authHeader = req.get('Authorization');

    if(!authHeader) {
        const error = new Error('No auntenticado, no hay JWT');
        error.statusCode = 401;
        throw error;
    }

    //obtener el token y verificalo
    const token = authHeader.split(' ')[1]; //Authorization : Bearer 2164613744(el token)
    let revisarToken;
    try {   
        revisarToken = jwt.verify(token, 'LLAVESECRETA')
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    //Si es un tioken valido pero hay algun error
    if(!revisarToken) {
        const error = new Error('No auntenticado');
        error.statusCode = 401;
        throw error;
    }

    next();
}