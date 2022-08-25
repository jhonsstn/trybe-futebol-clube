import * as chai from 'chai';
// import * as mocha from 'mocha';
import * as sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import Team from '../database/models/team';
import { teamList } from './mocks';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('Team route', () => {

  afterEach(()=>{
    sinon.restore();
  })

  it('should return a list of teams', async () => {
    sinon.stub(Team, "findAll").resolves(teamList as Team[]);

    const chaiHttpResponse: Response = await chai
      .request(app)
        .get('/teams')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.be.deep.equal(teamList);
  });

  it('should return a team if called with an exiting id', async () => {
    sinon.stub(Team, "findByPk").resolves(teamList[0] as Team);

    const chaiHttpResponse: Response = await chai
      .request(app)
        .get('/teams/1')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.be.deep.equal(teamList[0]);
  });

  it('should return a 404 if called with an non-existing id', async () => {
    sinon.stub(Team, "findByPk").resolves(null);

    const chaiHttpResponse: Response = await chai
      .request(app)
        .get('/teams/99999999')

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body).to.have.property('message');
  });
})
