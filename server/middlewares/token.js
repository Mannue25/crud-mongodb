
const jwt = require('jsonwebtoken')

// Verificar Token.

exports.verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no Válido'
                }
            })
        }

        req.usuario = decoded.usuario;
        next();
    })
};

exports.verificaAdminRol = (req, res, next) => {

        let usuario = req.usuario;

        if(usuario.role === 'ADMIN_ROLE') {
            next();
        } else {
            res.json({
                ok: false,
                err: {
                    message: 'El usuario no es administrador'
                }
            });
        }
}

