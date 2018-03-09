//Uso de promesas - practica
//validar pp

'use strict';

const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next){
    const ppIn = req.query.placaIn;
    console.log(req.query.placaIn);
    let promesa1 = new Promise((resolve, reject)=>{
        setTimeout(function(){
            resolve("Success!");
        },1000);
    });
    
    console.log("Redir despues de 1 sec..");

    promesa1.then((successMessage)=> {
        if(ppIn.length !== 8){
            const err = new Error('Error de longitud');
            err.status = 400;
            next(err);
        } else{
            res.locals.placaver = 'A: '+ ppIn;
            res.render('ppform');
        };
        console.log("Yay! "+successMessage);
    });
});

module.exports = router;