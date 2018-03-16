//validar comentario

'use strict'

const express = require("express");
const routerComentario = express.Router();
const routerComentarioDelete = express.Router();

const { searchInfo, Info } = require('../model/Info');

let msgError;

const promise = new Promise((resolve, reject) => resolve());

//methods
function isEmpty(x) {
    return (x === undefined || x === "")
};

function validateNonEmpty(variable, errorMessage) {
    return new Promise((fullfill, reject) => {
        if (isEmpty(variable)) {
            //return reject(new Error('Fail:')) buena practica
            msgError = errorMessage
            return reject('Fail',errorMessage);
        } else {
            return fullfill()
        }
    })
};

function createComment(req, res, next) {
    const email = req.query.email;
    const comment = req.query.coment;

    promise
        .then(() => console.log('Started'))
        .then(() => validateNonEmpty(email, "Email no provisto")) // Validar email
        .then(() => validateNonEmpty(comment, "Comentario no provisto"))  // Validar comentario
        /*.then(() => Info.create({
            correo: email,
            comentario: comment
        })) */ // Insertar en la BBDD
        .then(() => Info.findAll({
            order: ['id'] //order fields
        }))  // Traer todos los comentarios de la BBDD
        .then(comments => {
            res.locals.comments = comments
            res.render('comform')
        })
        .catch((err) => {
            res.locals.comments = [];
            res.locals.emailarm = msgError;
            res.render('comform');
            console.error("something went wrong: ", err) // Algo fallo
        })
}

function deleteComment(res, idToDelete) {
    console.log('Delete: '+idToDelete);
    const algo = [{correo: 'a', comentario:'b'}, {correo: 'c', comentario:'d'}]
    res.render('comform', {comments: algo});
}

//route
routerComentario.get("/", createComment);

module.exports = {
    routerComentario,
    isEmpty,
    validateNonEmpty,
    deleteComment
};