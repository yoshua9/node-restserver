var jwt = require('jsonwebtoken');


// ================
// VERIFICAR TOKEN
// ================


let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    err: {
                        message: 'El token no es válido'
                    }
                });
            }

            req.usuario = decoded.usuario;
            next();
        }


    )

    // res.json({
    //     token
    // });
    console.log(token);


};

// ================
// VERIFICAR ADMIN ROLE
// ================

let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (!(usuario.role === 'ADMIN_ROLE')) {
        res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }

        });
    } else {
        next();
    }



};
module.exports = {
    verificaToken,
    verificaAdminRole
};