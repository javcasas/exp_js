'use strict';

const {sequelize, Sequelize} = require('../connector/bddconn');

const Op = Sequelize.Op;

//model
const Info = sequelize.define('info', {
    correo: Sequelize.TEXT,
    comentario: Sequelize.TEXT
}, {
        //config:
        timestamps: false,
        frezeTableName: true,
        tableName: 'info',

        //getters
        getterMethods: {
            fullInfo: function () {
                return this.correo+' '+this.comentario;
            }
        },
    }
);

//methods
function searchInfoByNum(num) {
    return Info
        .findOne({ 
            where: {id: num}
         })
        .catch((err) => {
            return console.error('Error searchInfoByNum: ',err);
        });
};

module.exports = {
    searchInfoByNum,
    Info
};