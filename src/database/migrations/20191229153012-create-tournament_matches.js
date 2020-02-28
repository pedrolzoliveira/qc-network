'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('tournament_matches', { 
        tournament_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'Tournaments',
            key: 'id',
            OnUpdate: 'CASCADE',
            OnDelete: 'CASCADE'
          }
        },
        match_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'Matches',
            key: 'id',
            OnUpdate: 'CASCADE',
            OnDelete: 'CASCADE'
          }
        },
        stage: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
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
      return queryInterface.dropTable('tournament_matches');
  }
};
