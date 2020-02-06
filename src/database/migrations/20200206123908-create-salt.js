'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('salt', { 
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: false,
      } 
    });
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.dropTable('salt');
  }
};
