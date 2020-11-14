

const express = require('express');
const bodyParser = require('body-parser');
const port = require('./config/config')
const app = express();



// Middleware body parser

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Verbos para crear un CRUD
app.get('/usuario', (req, res) => {
    res.json('Get Usuario')
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    // Validar con estatus Code.
    
    if(body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            mensaje: 'Algo salío Mal'
        })
    } else {
        res.json({
            body
        })
    }
    
    
});

// Actualizar usuarios o clientes siempre con ID

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id
    res.json({
        id
    })
});

app.delete('/usuario', (req, res) => {
    res.json('delete Usuario');
});

app.listen(port)
