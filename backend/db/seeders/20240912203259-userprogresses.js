'use strict';

const { UserProgress } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const userProgressList = [
  {
    userId: 1,
    questionId: 1,
    status: true
  },
  {
    userId: 1,
    questionId: 2,
    status: false
  },
  {
    userId: 1,
    questionId: 3,
    status: true
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    try {
      await UserProgress.bulkCreate(userProgressList, { validate: true })
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'UserProgresses';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, { [Op.or]: userProgressList }, {});
  }
};
