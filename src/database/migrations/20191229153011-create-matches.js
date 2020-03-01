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
        stage: {
          type: Sequelize.INTEGER,
        },
        winner_user: {
          type: Sequelize.INTEGER,    
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
            OnUpdate: 'CASCADE',
          }      
        },
        winner_team: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'teams',
            key: 'id',
            OnUpdate: 'CASCADE',
          }
        },
        start_at: {
          type: Sequelize.DATE,
        },
        ended_at: {
          type: Sequelize.DATE,
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
