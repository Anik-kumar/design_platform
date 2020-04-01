const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should();
const assert = require('chai').assert;
const request = require('request');
const requestsp = require('supertest');

const app = require('../src/app');

//const {expect} = chai;

describe('Login Endpoint', () => {
    it('should login successfully', async () => {
        const res = await requestsp(app)
            .post('/api/user/login')
            .send({
                email: 'pijus@gmail.com',
                pass: 'test123',
            });

        expect(res.statusCode).to.equal(200);
        var data = res.body;
        console.log('--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ');
        console.log(data);
        data.should.have.property('name');
        expect(data['name']).to.not.be.undefined;
        expect(data['name']).to.not.be.null;
        data.name.should.have.property('first');
        data.name.should.have.property('last');

        //assert.typeOf(data.name.first, 'string');
        expect(data.name.first).to.be.a('string');
        expect(data.name.first).to.equal('Pijus');

        //assert.typeOf(data.name.last, 'string');
        expect(data.name.last).to.be.a('string');
        expect(data.name.last).to.equal('Sarker');

        data.should.have.property('email');
        expect(data['email']).to.not.be.undefined;
        expect(data['email']).to.not.be.null;
        expect(data.email).to.be.a('string');
        expect(data.email).to.equal('pijus@gmail.com');

        data.should.have.property('token');
        expect(data['token']).to.not.be.undefined;
        expect(data['token']).to.not.be.null;

        data.token.should.have.property('auth');
        expect(data.token.auth).to.not.be.null;
        expect(data.token.auth).to.be.a('boolean');

        data.token.should.have.property('token');
        expect(data.token.token).to.not.be.null;
        expect(data.token.token).to.be.a('string');

    })
})
