import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Team from '../database/models/team';
import IDbTeamData from '../repositories/interfaces/db-team-data.interface';
import { allTeamData } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard route', () => {

  it('should return a list of team data', async () => {
    sinon.stub(Team, 'findAll').resolves(allTeamData as unknown as IDbTeamData[])

    const chaiHttpResponse: Response = await chai
      .request(app)
        .get('/leaderboard')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body[0]).to.deep.equal({
        "name": "Palmeiras",
        "totalPoints": 13,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 17,
        "goalsOwn": 5,
        "goalsBalance": 12,
        "efficiency": "86.67"
      })
  });

})
