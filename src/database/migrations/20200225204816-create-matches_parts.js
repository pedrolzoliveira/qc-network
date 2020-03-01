'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('matches_parts', {
      match_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'matches',
          key: 'id',
          OnUpdate: 'CASCADE',
          OnDelete: 'CASCADE',
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
          OnUpdate: 'CASCADE',
          OnDelete: 'CASCADE',
        },
      },
      team_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'teams',
          key: 'id',
          OnUpdate: 'CASCADE',
          OnDelete: 'CASCADE',
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('matches_parts');
  }
};
