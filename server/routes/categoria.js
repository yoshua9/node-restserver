const express = require('express');

const { verificaToken, verificaAdminRole } = require('../middlewares/authentication');

let app = express();

let Categoria = require('../models/categoria');

//
// Mostrar todas la categorias
//
app.get('/categoria', verificaToken, (req, res) => {

    //let desde = Number(req.query.desde) || 0;
    //let limite = Number(req.query.limite) || 0;


    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categoria) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            Categoria.countDocuments({}, (err, conteo) => {

                res.json({
                    ok: true,
                    categoria,
                    cuantos: conteo
                });
            });

        });
});


//
// Mostrar una categoria por ID
//
app.get('/categoria/:id', verificaToken, (req, res) => {

    //devolver la categoria
    //req.usuario._id

    let id = req.params.id;
    //let body = _.pick(req.body);

    // delete body.password;
    // delete body.google;

    Categoria.findById(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe esa categoria'
                }
            });
        }


        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });
});

// =====================
// Crear nueva categoria
// =====================
app.post('/categoria', verificaToken, (req, res) => {
    //devolver la categoria
    //req.usuario._id

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});


//
// Actualizar categorias
//
app.put('/categoria/:id', verificaToken, (req, res) => {
    //devolver la categoria
    //req.usuario._id

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });


});

//
// Borrado de las  categorias
//
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    //solo un administrador puede borrar las categorias
    //Categoria.findbyidandDelete

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Categoria.findByIdAndDelete(id, (err, categoriaBorrada) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria Borrada'
        });

    });
});

module.exports = app;