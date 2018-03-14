//validar comentario

'use strict'

const express = require("express");
const router = express.Router();

const {searchInfo, Info} = require('../model/Info');

//methods
function createComment (req, res, next) {
    const email = req.query.email;
    const comment = req.query.coment;

    res.locals.comments = [];

    if (email === undefined || email === "") {
        res.locals.emailarm = 'Email no provisto';
        res.render('comform');
        return console.error('Err2: ',err);        
    }

    if (comment === undefined || comment === "") {
        res.locals.emailarm = 'Comentario no provisto';
        res.render('comform');
        return console.error('Err2: ',err);        
    }

    // Email and comment are fine. Proceed to write them to the DB
    const newComment = Info.create({
        correo: email,
        comentario: comment
    }).then(comment => console.log("This is my comment:", JSON.stringify(comment))
    ).then(() => console.log("Comment created")
    ).then(() => {
        Info.all()
            .then(comments => {
                console.log("Data VAlues:", comments[0].dataValues)
                console.log("Email Attribute:", comments[0].email)
                console.log(JSON.stringify(comments))
                res.locals.comments = comments
                res.render('comform')
            })
    })


    /*value.then((info) => {
        res.locals.emailarm = req.query.email + '-' +info.dato;
        res.render('comform');
    })
    .catch((err) => {
        res.locals.emailarm = 'ERROR DE DATO';
        res.render('comform');
        return console.error('Err2: ',err);
    });*/
}

//route
router.get("/", function(req, res, next){
    /*res.locals.emailarm = 'CORREO:' +req.query.email;
    res.render('comform');*/
    //processPromObj(searchInfo(1), res, req);
    createComment(req, res, next);
});

module.exports = router;