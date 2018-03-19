// test/app_spec.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const expect = chai.expect;

const assert = chai.assert;

const { routerComentario, isEmpty, validate } = require('../public/javascripts/validador/validadorComentario');

const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

//Function testers
describe('validadorComentario: ', function () {
    describe('validate function', function () {
        it('reject promise - without email', function () {
            return expect(validate(undefined, 'comentario'))
                .to.eventually.be.rejectedWith('Email no provisto');
        });
        it('reject promise - blank email', function () {
            return expect(validate('', 'comentario'))
                .to.eventually.be.rejectedWith('Email no provisto');
        });

        it('reject promise - without comment', function () {
            return expect(validate('email', undefined))
                .to.eventually.be.rejectedWith('Comentario no provisto');
        });
        it('reject promise - without comment', function () {
            return expect(validate('email', ''))
                .to.eventually.be.rejectedWith('Comentario no provisto');
        });

        it('reject promise - without all', function () {
            return expect(validate(undefined, undefined))
                .to.eventually.be.rejectedWith('Email no provisto');
        });
        it('reject promise - blank all', function () {
            return expect(validate('', ''))
                .to.eventually.be.rejectedWith('Email no provisto');
        });
    });

    describe('isEmpty function', function () {
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
});