const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  reviewId: {
    type: Sequelize.STRING,
  },
  bandId: {
    type: Sequelize.STRING
  },
  albumId: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.INTEGER
  },
  reviewer: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATEONLY
  }
})

module.exports = Review
