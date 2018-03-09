//validar comentario

'use strict'

const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next){
    console.log('Form: '+ req.query.form);
    console.log('Email:'+ req.query.email);
    console.log('Comentario:' + req.query.coment);
    res.locals.emailarm = 'CORREO:' +req.query.email;
    res.render('comform');
});

module.exports = router;