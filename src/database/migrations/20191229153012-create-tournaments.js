'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('tournaments', { 
        tournament_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        stage: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        match_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Matches',
            key: 'id'
          }
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
    
      return queryInterface.dropTable('tournaments');
    
  }
};
