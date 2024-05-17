import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
// @ts-ignore
import jwt = require('jsonwebtoken');

import { app } from '../app';
import SequelizeMatches from '../database/models/matches.model';
import SequelizeTeam from '../database/models/teams.model';

import { Response } from 'superagent';
import { AllMatchesMock } from './mocks';
import validationToken from '../middlewares/validationToken';

chai.use(chaiHttp);


const { expect } = chai;

describe('Testes de Login', () => {
  afterEach(() => {
    sinon.restore()
  })
  it('Testando listagem de matches', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(AllMatchesMock as any);

    const chaiHttpResponse = await chai
       .request(app)
       .get('/matches').send();
    
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(AllMatchesMock);
  });
  it('Testando listagem de matches inProgress true', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(AllMatchesMock as any);

    const chaiHttpResponse = await chai
       .request(app)
       .get('/matches?inProgress=true').send();
    
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.eq([AllMatchesMock[1]]);
  });
  it('Testando listagem de matches inProgress false', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(AllMatchesMock as any);

    const chaiHttpResponse = await chai
       .request(app)
       .get('/matches?inProgress=false').send();
    
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.eq([AllMatchesMock[0]]);
  });
  it('Testando finalizar partida.', async () => {
    sinon.stub(SequelizeMatches, 'update').resolves([1] as any);
    sinon.stub(jwt, 'verify').returns(true as any)

    const chaiHttpResponse = await chai
       .request(app)
       .patch('/matches/1/finish').set('Authorization', `Bearer Token`).send();
    
    expect(chaiHttpResponse.status).to.equal(200);
  });
  it('Testando editar partida.', async () => {
    sinon.stub(SequelizeMatches, 'update').resolves([1] as any);
    sinon.stub(jwt, 'verify').returns(true as any)

    const chaiHttpResponse = await chai
       .request(app)
       .patch('/matches/1').set('Authorization', `Bearer Token`).send({
        homeTeamGoals: 3,
        awayTeamGoals: 1
      });
    
    expect(chaiHttpResponse.status).to.equal(200);
  });
  it('Testando cadastrar partida.', async () => {
    sinon.stub(SequelizeTeam, 'findByPk').resolves([1] as any);
    sinon.stub(jwt, 'verify').returns(true as any)
    sinon.stub(SequelizeMatches, 'create').resolves([1] as any);

    const chaiHttpResponse = await chai
       .request(app)
       .post('/matches').set('Authorization', `Bearer Token`).send({
        "homeTeamId": 16,
        "awayTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      });
    
    expect(chaiHttpResponse.status).to.equal(201);
  });
});
