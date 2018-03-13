//Uso de promesas - practica
//validar pp

'use strict';

const express = require("express");
const router = express.Router();

const db = require('../connector/bddconn'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

const Info = require('../model/Info');

const isValidLength = function(value){
    return value.length !== 8;
};

const processPromObj = function(value, res){
    console.log('Intento: '+value);
    value.then((info) => {
        console.log('num: '+info.dato);
        res.locals.placaver = info.dato;
        res.render('ppform');
    });
}

router.get("/", function(req, res, next){
    const ppIn = req.query.placaIn;

    let promesa1 = new Promise((resolve, reject)=>{
        setTimeout(function(){
            resolve("Success!");
        },1000);
    });
    
    promesa1.then((successInfoMessage)=> {
        if (isValidLength(ppIn)){
            const err = new Error('Error de longitud');
            err.status = 400;
            next(err);
        } else {
            processPromObj(Info(1), res);            
        }
    });
});

module.exports = router;