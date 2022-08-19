import * as chai from 'chai';
// import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login route', () => {

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves();
  // } );

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  it('...', async () => {
    const chaiHttpResponse: Response = await chai
      .request(app)
        .post('/login')
        .send({
          "email": "admin@admin.com",
          "password": "secret_admin"
        })
      expect(chaiHttpResponse).to.have.status(200);
  });
})
