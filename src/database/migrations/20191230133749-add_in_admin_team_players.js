'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('team_players', 'in_admin', {
      type: Sequelize.BOOLEAN,
      after: 'player_id',
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropColumn('team_players', 'in_admin');   
  }
};
