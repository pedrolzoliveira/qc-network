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
            OnUpdate: 'CASCADE',
          },
        },
        part1_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Parts',
            key: 'id',
            OnUpdate: 'CASCADE',
          },
        },
        part2_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Parts',
            key: 'id',
            OnUpdate: 'CASCADE',
          }
        },
        winner_id: {
          type: Sequelize.INTEGER,    
          allowNull: true,
          references: {
            model: 'Parts',
            key: 'id',
            OnUpdate: 'CASCADE',
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
