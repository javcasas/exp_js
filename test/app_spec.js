// test/app_spec.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const expect = chai.expect;

const assert = chai.assert;

const { routerComentario, isEmpty, validateNonEmpty } = require('../public/javascripts/validador/validadorComentario');

const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

//Route testers
/*
//test: opcion pico y placa
describe('App pico y placa test', function () {
    describe('/ppdemo', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .post('/ppdemo')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});

//test: opcion comentarios
describe('App comentario test', function () {
    describe('/comdemo', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .post('/comdemo')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});

//test: desde formulario picoyplaca caso: OK
describe('App formpp test OK', function () {
    describe('/validarpp?placaIn=99999999', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .get('/validarpp?placaIn=99999999')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});

//test: desde formulario picoyplaca caso: FALLA
describe('App formpp test FALLA', function () {
    describe('/validarpp?placaIn=111', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .get('/validarpp?placaIn=111')
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });
});

//test: desde formulario comentario
describe('App formcom test', function () {
    describe('/processform?email=test@mail.com&coment=test', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .get('/processform?email=test@mail.com&coment=test')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});*/

//Function testers
describe('validadorComentario - isEmpty function', function () {
    it('when is empty', function (done) {
        expect(isEmpty()).to.be.true;
        done();
    });
    it('when is \'\' ', function (done) {
        expect(isEmpty('')).to.be.true;
        done();
    })
    it('otherwise', function (done) {
        expect(isEmpty('test')).to.be.false;
        done();
    })
});

describe('validadorComentario - validateNonEmpty function', function () {
    it('resolves as promised', function() {
        return expect(validateNonEmpty('', 'error'))
            .to.eventually.be.rejectedWith('Fail');
    });
    it('resolves as promised', function() {
        /*return expect(validateNonEmpty('test', 'error')).to.eventually.be.fulfilled.then(x => {   
        });*/ //para validar si el promise es un objeto, valida lo interno: ejmplo: un campo field = null
        return expect(validateNonEmpty('test', 'mensaje'))
            .to.eventually.be.equal();
    });
});