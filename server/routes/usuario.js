const express = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const {verificaToken, verificaAdminRol} = require('../middlewares/token')
const app = express();

// Verbos para crear un CRUD
app.get("/usuario", verificaToken,(req, res)=>{

  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Usuario.find({estado: true}, "nombre email")
    .skip(desde)
    .limit(limite)
    .exec((err, usuario) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      Usuario.countDocuments({estado: true}, (err, conteo) => {
        res.json({
          ok: true,
          usuario,
          cuentos: conteo,
        });
      });
    });
});

app.post("/usuario", [verificaToken, verificaAdminRol], (req, res) => {
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });
});

// Actualizar usuarios o clientes siempre con ID

app.put("/usuario/:id", [verificaToken,verificaAdminRol], (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["nombre", "email", "imagen", "role", "estado"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      res.json({
        ok: true,
        usuario: usuarioDB,
      });
    }
  );
});



app.delete("/usuario/:id", [verificaToken, verificaAdminRol], (req, res) => {
  let cambiaEstado = {
    estado: false
  }
  let id = req.params.id;

  Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, usuarioBorrado) => {
    if(err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    if(!usuarioBorrado) {
      return res.status(400).json({
        ok: false,
        error: {
          message: 'Usuario no encontrado'
        }
      })
    }

    res.json({
      ok: true,
      usuario: usuarioBorrado
    })
  })
});

module.exports = app;


