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
    if (isEmpty(variable)) {
        res.locals.emailarm = errorMessage;
        res.render('comform');
    }
}

function createComment (req, res, next) {
    const email = req.query.email;
    const comment = req.query.coment;

    res.locals.comments = [];

    validateNonEmpty(email, "Email no provisto", res);
    validateNonEmpty(comment, "Comentario no provisto", res);

    // Email and comment are fine. Proceed to write them to the DB
    const newComment = Info.create({
        correo: email,
        comentario: comment
    })
    .then(() => Info.all())
    .then(comments => {
        res.locals.comments = comments
        res.render('comform')
    })
}

//route
router.get("/", createComment);

module.exports = router;