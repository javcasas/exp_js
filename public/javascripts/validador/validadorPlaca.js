//Uso de promesas - practica
//validar pp

'use strict';

const express = require("express");
const router = express.Router();
const searchInfo = require('../model/Info');

//methods
const promise = new Promise((resolve, reject) => {
    setTimeout(function () {
        resolve("Success!");
    }, 1000);
});

const isValidLength = function (value) {
    return value.length !== 8;
};

const processPromObj = function (value, res) {
    value.then((info) => {
        res.locals.placaver = info.dato;
        res.render('ppform');
    })
    .catch((err) => {
        res.locals.placaver = 'ERROR DE DATO';
        res.render('ppform');
        return console.error('Err2: ', err);
    });;
}

//route
router.get("/", function (req, res, next) {
    const ppIn = req.query.placaIn;
    if (isValidLength(ppIn)) {
        const err = new Error('Error de longitud');
        err.status = 400;
        next(err);
    } else {
        processPromObj(searchInfo(1), res);
    }
});

module.exports = router;