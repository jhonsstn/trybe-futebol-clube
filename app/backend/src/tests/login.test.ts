import * as chai from 'chai';
// import * as mocha from 'mocha';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Response } from 'superagent';
import User from '../database/models/user';
import { TokenData } from '../services/interfaces/authenticator.interface';
import { userList } from './mocks';


chai.use(chaiHttp);

const { expect } = chai;

describe('Login route', () => {

  // beforeEach(async () => {

  // } );

  afterEach(()=>{
    sinon.restore();
  })

  it('should return status code 200 if user exists', async () => {
    sinon.stub(bcrypt, "compare").resolves(true);
    sinon.stub(User, "findOne").resolves(userList[0] as User);

    const chaiHttpResponse: Response = await chai
      .request(app)
        .post('/login')
        .send({
          "email": "valid_email@mail.com",
          "password": "valid_password"
        })
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('should return status code 401 if user does not exist', async () => {
    sinon.stub(bcrypt, "compare").resolves(true);
    sinon.stub(User, "findOne").resolves(null);

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
    sinon.stub(bcrypt, "compare").resolves(false);
    sinon.stub(User, "findOne").resolves(userList[0] as User);

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

  it("should return user role if authentication token is valid", async () => {
    sinon.stub(jwt, "verify").resolves({role: "admin"});

    const chaiHttpResponse: Response = await chai
      .request(app)
        .get('/login/validate')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal({role: "admin"});
  });
})
