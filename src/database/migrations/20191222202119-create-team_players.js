'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('team_players', { 
        team_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          key: true,
          references: {
            model: 'teams',
            key: 'id',
            OnUpdate: 'CASCADE',
            OnDelete: 'CASCADE',
          }
        },
        player_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          key: true,
          references: {
            model: 'players',
            key: 'id', 
            OnUpdate: 'CASCADE',
            OnDelete: 'CASCADE',
          }
        },
        in_admin: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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
    
      return queryInterface.dropTable('team_players');
    
  }
};
