'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('matches', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        tournament_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Tournaments',
            key: 'id',
          },
        },
        part1_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Parts',
            key: 'id'
          },
        },
        part2_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Parts',
            key: 'id'
          }
        },
        winner_id: {
          type: Sequelize.INTEGER,    
          allowNull: true,
          references: {
            model: 'Parts',
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
    
      return queryInterface.dropTable('matches');
    
  }
};
