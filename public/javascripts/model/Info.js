'use strict';

const db = require('../connector/bddconn'),
    sq = db.sq,
    Sequelize = db.SQ;

const Op = Sequelize.Op;

//model
const Info = sq.define('info', {
    dato: Sequelize.TEXT,
    numero: Sequelize.INTEGER,
    comentario: Sequelize.TEXT
}, {
        //config:
        timestamps: false,
        frezeTableName: true,
        tableName: 'info',

        //getters
        getterMethods: {
            metodo1: function () {
                return '12345';
            }
        },
    }
);

//methods
function consulta(num) {
    return Info
        .findOne({ 
            where: {numero: num}
         })
        .then((info) => {
            return info;
        })
        .catch((err) => {
            return console.error(err);
        });
};

module.exports = consulta;