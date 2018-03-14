//validar comentario

'use strict'

const express = require("express");
const router = express.Router();

const {searchInfo, Info} = require('../model/Info');

//methods
function isEmpty(x) {
    return (x === undefined || x === "")
}

function validateNonEmpty(variable, errorMessage, res) {
    return new Promise((fullfill, reject) => {
        if (isEmpty(variable)) {
            res.locals.emailarm = errorMessage;
            //return reject(new Error('Fail:')) buena practica
            return reject('Fail');
        } else {
            return fullfill()
        }
    })
}

function createComment (req, res, next) {
    const email = req.query.email;
    const comment = req.query.coment;

    res.locals.comments = [];

    new Promise((fullfill, reject) => fullfill())
        .then(() => console.log("Started"))
        .then(() =>validateNonEmpty(email, "Email no provisto", res)) // Validar email
        .then(() =>validateNonEmpty(comment, "Comentario no provisto", res))  // Validar comentario
        .then(() => Info.create({
            correo: email,
            comentario: comment
        }))  // Insertar en la BBDD
        .then(() => Info.all())  // Traer todos los comentarios de la BBDD
        .then(comments => {
            res.locals.comments = comments
            res.render('comform')
        })
        .catch((err) => console.error("something went wrong: ", err)) // Algo fallo
    // Email and comment are fine. Proceed to write them to the DB
    /*const newComment = Info.create({
        correo: email,
        comentario: comment
    })
    .then(() => Info.all())
    .then(comments => {
        res.locals.comments = comments
        res.render('comform')
    })*/
}

//route
router.get("/", createComment);

module.exports = router;