'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('token_blacklist', { 
      token: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      due_date: {
        type: Sequelize.INTEGER,
        allowNull: true,
      } 
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('token_blacklist');
  }
};
