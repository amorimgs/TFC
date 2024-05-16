import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
// @ts-ignore
import bcrypt = require('bcryptjs');
// @ts-ignore
import jwt = require('jsonwebtoken');

import { app } from '../app';
import SequelizeUsers from '../database/models/users.model';

import { Response } from 'superagent';
import { AllTeamsMock } from './mocks';

chai.use(chaiHttp);


const { expect } = chai;

describe('Testes de Login', () => {
  afterEach(() => {
    sinon.restore()
  })
  it('Testando login com sucesso', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves({
      id:1,
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      email: 'test@test.com'
    } as any);

    sinon.stub(bcrypt, 'compare').resolves(true);
    sinon.stub(jwt, 'sign').returns('token' as any);

    const chaiHttpResponse = await chai
       .request(app)
       .post('/login').send({email: 'test@test.com', password: 'admin123'});
    
    expect(chaiHttpResponse.status).to.equal(200);
  });
  it('Deve responder 400 se email não for enviado', async function () {
    const response = await chai.request(app)
      .post('/login')
      .send({
        password: '123456'
      })
    expect(response.status).to.be.equal(400)
  })
  it('Deve responder 400 se passowrd não for enviado', async function () {
    const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'email@email.com'
      })
    expect(response.status).to.be.equal(400)
  })
});
