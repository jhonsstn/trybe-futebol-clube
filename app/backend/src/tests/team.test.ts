import * as chai from 'chai';
// import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team route', () => {

  it('should return a list of teams', async () => {
    const chaiHttpResponse: Response = await chai
      .request(app)
        .get('/teams')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('array');
  });

  it('should return a team if called with an exiting id', async () => {
    const chaiHttpResponse: Response = await chai
      .request(app)
        .get('/teams/1')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('object');
  });

  it('should return a 404 if called with an non-existing id', async () => {
    const chaiHttpResponse: Response = await chai
      .request(app)
        .get('/teams/99999999')

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body).to.have.property('message');
  });
})
