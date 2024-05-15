import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeams from '../database/models/teams.model';

import { Response } from 'superagent';
import { AllTeamsMock } from './mocks';

chai.use(chaiHttp);


const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  it('Testando getAllTeams', async () => {
    sinon.stub(SequelizeTeams, 'findAll').resolves(AllTeamsMock as any);

    const chaiHttpResponse = await chai
       .request(app)
       .get('/teams');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(AllTeamsMock);
  });
  it('Testando getAllTeams', async () => {
    sinon.stub(SequelizeTeams, 'findByPk').resolves({id: 1, teamName: 'Time 1'} as any);

    const chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq({id: 1, teamName: 'Time 1'});
  });

  /*it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });*/
});
