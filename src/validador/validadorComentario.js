//validar comentario
'use strict'

const express = require("express");
const routerComentario = express.Router();
const routerComentarioDelete = express.Router();

const { searchInfo, Info } = require('../model/Info');

//methods
function validate(email, comentario) { //se puede probar
    return new Promise((resolve, reject) => {
        if (isEmpty(email)) {
            return reject('Email no provisto');
        }
        if (isEmpty(comentario)) {
            return reject('Comentario no provisto');
        }
        resolve({
            email,
            comentario
        });
    })
}

function renderPage(res, data) {//no se debe validar funciones que reciben res como param
    return res.render('comform', {
        "comments": data.comments,
        "emailarm": data.emailarm
    });
}

function isEmpty(x) {
    return (x === undefined || x === "");
};

//create
function createComment(req, res, next) {
    validate(req.query.email, req.query.coment)
        .then((datos) => Info.create({
            correo: datos.email,
            comentario: datos.comentario
        }))  // Insertar en la BBDD
        .then(() => Info.findAll({
            order: ['id'] //order fields
        }))  // Traer todos los comentarios de la BBDD
        .then(comments => {
            renderPage(res, {comments});
        })
        .catch((err) => {
            console.error("something went wrong: ", err) // Algo fallo
            renderPage(res, {comments: [], emailarm:err});
        });
};

//read
function readComment(req, res, next) {
    return new Promise((resolve, reject) => resolve())
        .then(() => Info.findAll({
            order: ['id'] //order fields
        })) //Bring all comments from DB
        .then(comments => {
            renderPage(res, {comments});
        })
        .catch((err) => {
            console.error("something went wrong: ", err); // Algo fallo
            renderPage(res, {comments: [], emailarm:err});
        });
};

//delete
function deleteComment(res, idToDelete) {
    return new Promise((resolve, reject) => resolve())
        .then(() => Info.destroy({
            where: {
                id: idToDelete
            }
        })) //delete selected comment from DB (based on Id selected)
        .then(() => Info.findAll({
            order: ['id'] //order fields
        })) //Bring all comments from DB
        .then(comments => {
            renderPage(res, {comments, emailarm:'Eliminado: '+idToDelete});
        })
        .catch((err) => {
            console.error("something went wrong: ", err); // Algo fallo
            renderPage(res, {comments: [], emailarm:err});
        });
}

//update
    //render the new form for do updates
function updateComment(res, idToUpdate) {
    return new Promise((resolve, reject) => resolve())
        .then(() => Info.findOne({
            where: {
                id: idToUpdate
            }
        })) //find the one who will be updated
        .then(row => {
            res.render('updatecomform', {
                id: row.id,
                email: row.correo, 
                coment: row.comentario});
        })
        .catch((err) => {
            console.error("something went wrong: ", err); // Algo fallo
            renderPage(res, {comments: [], emailarm:err});
        });
}
    //update promise
function saveUpdatedComment(req, res, next) {
    validate(req.query.email, req.query.coment)
        .then(() => Info.update({
            correo: req.query.email,
            comentario: req.query.coment
        },{
            where: {
                id: req.query.id
            }
        })) //update selected comment from DB (based on Id selected)
        .then(() => Info.findAll({
            order: ['id'] //order fields
        })) //Bring all comments from DB
        .then(comments => {
            renderPage(res, {comments, emailarm:'Informacion actualizada'});
        })
        .catch((err) => {
            console.error("something went wrong: ", err); // Algo fallo
            renderPage(res, {comments: [], emailarm:err});
        });
}

//route
routerComentario.get("/", createComment);

module.exports = {
    routerComentario,
    isEmpty,
    validate,
    createComment,
    readComment,
    deleteComment,
    updateComment,
    saveUpdatedComment
};