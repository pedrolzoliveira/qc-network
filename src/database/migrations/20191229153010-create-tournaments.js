'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('tournaments', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        price: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        prize: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        currency: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'currencies',
            key: 'id',
          },
        },
        winner_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Parts',
            key: 'id',
          },
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
    
      return queryInterface.dropTable('tournaments');
    
  }
};
