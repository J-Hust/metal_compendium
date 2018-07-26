const Sequelize = require('sequelize')
const db = require('../db')

const Band = db.define('band', {
  bandId: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  },
  formed_in: {
    type: Sequelize.STRING
  },
  genre: {
    type: Sequelize.STRING
  },
  lyrical_themes: {
    type: Sequelize.STRING
  },
  last_label: {
    type: Sequelize.STRING
  },
  years_active: {
    type: Sequelize.STRING
  }
})

module.exports = Band
