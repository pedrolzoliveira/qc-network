'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('currencies', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        }
      });
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('currencies');
  }
};