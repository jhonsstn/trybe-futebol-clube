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

  it('should return status code 200 if user exists', async () => {
    const chaiHttpResponse: Response = await chai
      .request(app)
        .post('/login')
        .send({
          "email": "admin@admin.com",
          "password": "secret_admin"
        })
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('should return status code 401 if user does not exist', async () => {
    const chaiHttpResponse: Response = await chai
      .request(app)
        .post('/login')
        .send({
          "email": "invalid_main@mail.com",
          "password": "secret_admin"
        })
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.have.property('message');
  });

  it('should return status code 401 if password is incorrect', async () => {
    const chaiHttpResponse: Response = await chai
      .request(app)
        .post('/login')
        .send({
          "email": "admin@admin.com",
          "password": "invalid_password"
        })
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.have.property('message');
  });

  it("should return 400 if email is not provided", async () => {
    const chaiHttpResponse: Response = await chai
      .request(app)
        .post('/login')
        .send({
          "password": "secret_admin"
        })
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.have.property('message');
  });

  it("should return 400 if password is not provided", async () => {
    const chaiHttpResponse: Response = await chai
      .request(app)
        .post('/login')
        .send({
          "password": "secret_admin"
        })
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.have.property('message');
  });
})
