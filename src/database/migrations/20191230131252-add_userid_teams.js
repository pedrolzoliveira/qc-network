'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('teams', 'player_id', {
      type: Sequelize.INTEGER,
      after: 'id',
      allowNull: false,
      references: {
        model: 'players',
        key: 'id',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropColumn('teams', 'player_id');   
  }
};
