'use strict';

const Sequelize = require('sequelize');

//connection
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

module.exports = {
    sequelize,
    Sequelize
};