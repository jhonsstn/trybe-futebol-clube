import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import Match from '../database/models/match';
import Team from '../database/models/team';
import IMatch from '../repositories/interfaces/match.interface';
import { allMatches, createdMatch, finishedMatches, inProgressMatches } from './mocks';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('Match route', () => {

  afterEach(async () => {
    sinon.restore();
  })

  it('should return a list of matches', async () => {
    sinon.stub(Match, "findAll").resolves(allMatches as IMatch[]);

    const chaiHttpResponse: Response = await chai
      .request(app)
        .get('/matches')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.be.deep.equal(allMatches);
  });

  it('should update a match', async () => {
    sinon.stub(Match, "update").resolves();

    const chaiHttpUpdateResponse: Response = await chai
      .request(app)
        .patch('/matches/1')
        .send({
          "homeTeamGoals": 10,
          "awayTeamGoals": 10
        })
      expect(chaiHttpUpdateResponse).to.have.status(200);
      expect(chaiHttpUpdateResponse.body).to.be.deep.equal({
        message: 'Updated'
      });
  })

  it('should return a list of matches in progress', async () => {
    sinon.stub(Match, "findAll").resolves(inProgressMatches as IMatch[]);

    const chaiHttpResponse: Response = await chai
      .request(app)
        .get('/matches?inProgress=true')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.be.deep.equal(inProgressMatches);
  })

  it('should return a list of finished matches', async () => {
    sinon.stub(Match, "findAll").resolves(finishedMatches as IMatch[]);

    const chaiHttpResponse: Response = await chai
      .request(app)
        .get('/matches?inProgress=false')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.be.deep.equal(finishedMatches);
  })

  it('should throw an error if user try to add a match with an invalid token', async () => {
    sinon.stub(jwt, "verify").resolves(new Error())

    const chaiHttpResponse: Response = await chai
      .request(app)
        .post('/matches')

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.have.property('message');
  })

  it('should throw an error if user try to add a match with two equal teams', async () => {
    const chaiHttpResponse: Response = await chai
      .request(app)
        .post('/matches')
        .send({
          "homeTeam": 1,
          "awayTeam": 1,
          "homeTeamGoals": 1,
          "awayTeamGoals": 1
        })

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.have.property('message');
  })

  it("should throw an error if user try to add a match with a team that doesn't exists", async () => {
    sinon.stub(jwt, "verify").resolves()
    sinon.stub(Team, "findByPk").resolves(null)

    const chaiHttpResponse: Response = await chai
      .request(app)
      .post('/matches')
      .send({
        "homeTeam": 1,
        "awayTeam": 2,
        "homeTeamGoals": 1,
        "awayTeamGoals": 1
      })

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body).to.have.property('message');
  })

  it("should update a match to finished state", async () => {
    sinon.stub(Match, "update").resolves()

    const chaiHttpResponse: Response = await chai
      .request(app)
      .patch('/matches/:id/finish')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Finished" })
  })

  it("should add a match", async () => {
    sinon.stub(jwt, "verify").resolves()
    sinon.stub(Match, "create").resolves(createdMatch as unknown as Match)

    const chaiHttpResponse: Response = await chai
      .request(app)
      .post('/matches')
      .send({
        "homeTeam": 2,
        "awayTeam": 1,
        "homeTeamGoals": 1,
        "awayTeamGoals": 1
      })

      expect(chaiHttpResponse).to.have.status(201);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        id: 1,
        homeTeam: 1,
        awayTeam: 2,
        homeTeamGoals: 1,
        awayTeamGoals: 1,
        inProgress: true
      })
  })

})

// /matches/:id/finish
