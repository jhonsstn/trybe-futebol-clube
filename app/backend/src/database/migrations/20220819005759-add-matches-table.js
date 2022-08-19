'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      home_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Team',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      home_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      away_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Team',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      away_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      in_progress: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
