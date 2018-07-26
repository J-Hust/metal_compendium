const db = require('../server/db')
const {Reviews} = require('../server/db/models')
const fs = require('fs')
const Sequelize = require('sequelize')

db.query('select a.year, round(avg(r.score)) as score from reviews r inner join albums a on a."albumId" = r."albumId" group by a.year order by a.year asc', { type: Sequelize.QueryTypes.SELECT})
  .then(stuff => {
    console.log(stuff)
    let reviews = JSON.stringify(stuff)

    fs.writeFile('./viz/reviewsOverTime.json', reviews)
  })
