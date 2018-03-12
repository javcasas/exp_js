//Uso de promesas - practica
//validar pp

'use strict';

const express = require("express");
const router = express.Router();

const testbdd = require('../control/bddconn');

const isValidLength = function(value){
    return value.length !== 8;
};

router.get("/", function(req, res, next){
    const ppIn = req.query.placaIn;

    let promesa1 = new Promise((resolve, reject)=>{
        setTimeout(function(){
            resolve("Success!");
        },1000);
    });
    
    promesa1.then((successMessage)=> {
        if (isValidLength(ppIn)){
            const err = new Error('Error de longitud');
            err.status = 400;
            next(err);
        } else {
            res.locals.placaver = 'A: '+ppIn;
            res.render('ppform');
        }
    });
});

module.exports = router;