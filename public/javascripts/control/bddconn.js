'use strict';

const express = require("express");
const router = express.Router();

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

sequelize.authenticate().then(() => {
    console.log('Conexion establecida con exito!');
}).catch(err=> {
    console.error('No se puede conectar. ', err);
});
/*
//definir entidad de dominio y persistirla contra la bdd
const Info = sequelize.define('info', {
    dato:{
        type:Sequelize.STRING,
        field:'dato'
    },
    numero:{
        type:Sequelize.INTEGER,
        field:'numero'
    },
    comentario:{
        type:Sequelize.TEXT,
        field:'comentario'
    }
},{
    freezeTableName:true
});

const info1 = Info.sync({
    force:true
}).then(function(){
    return Info.create({
        dato:'dato exp',
        numero:2,
        comentario:'comentario desde Express js'
    });
});*/

router.get("/", function(req,res, next){
    console.log('BDD...');
    res.render('ppform'); 
})

module.exports = router;