/*
function validarPlaca(placaIn){
    var control = true;
    console.log("validar placa...")

    //la longitud de la placa debe ser 8
    if(placaIn.length !== 8){
        control = false;
    }
    //verificar el patron

    return control;
}*/

var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next){
    let promesa1 = new Promise((resolve, reject)=>{
        setTimeout(function(){
            resolve("Success!");
        },5000);
    });

    console.log("Redir despues de 5 sec..");

    promesa1.then((successMessage)=> {
        res.render('ppform');
        console.log("Yay! "+successMessage);
    });
});

module.exports = router;

