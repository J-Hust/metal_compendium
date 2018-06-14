const Sequelize = require('sequelize')
const db = require('../db')

const Album = db.define('album', {
  bandId: {
    type: Sequelize.STRING
  },
  albumId: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  year: {
    type: Sequelize.INTEGER
  },
  reviews: {
    type: Sequelize.STRING
  }
})

module.exports = Album
