'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('matchs', 'tournament_id', {
      type: Sequelize.BOOLEAN,
      after: 'id',
      references: {
        model: 'tournaments',
        key: 'id',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropColumn('matchs', 'tournament_id');   
  }
};
