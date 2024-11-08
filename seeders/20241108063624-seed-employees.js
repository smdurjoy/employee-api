'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Employees', [
      {
        id: 1,
        name: 'John Doe',
        positionId: 1,
        positionName: 'CTO',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Jane Smith',
        positionId: 2,
        positionName: 'Senior Software Engineer',
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Alice Johnson',
        positionId: 3,
        positionName: 'Software Engineer',
        parentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Bob Brown',
        positionId: 4,
        positionName: 'Junior Software Engineer',
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Emma White',
        positionId: 2,
        positionName: 'Senior Software Engineer',
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'Charlie Black',
        positionId: 3,
        positionName: 'Software Engineer',
        parentId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};
