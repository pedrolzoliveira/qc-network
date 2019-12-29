'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('parts', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        part_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        in_player: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        in_team: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
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
    
      return queryInterface.dropTable('parts');
    
  }
};
