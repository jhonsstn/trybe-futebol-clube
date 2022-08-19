import * as chai from 'chai';
// import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Match route', () => {

  it('should return a list of matches', async () => {
    const chaiHttpResponse: Response = await chai
      .request(app)
        .get('/matches')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('array');
  });

})
