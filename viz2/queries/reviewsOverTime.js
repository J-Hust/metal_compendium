const db = require('../../server/db')
const fs = require('fs')
const Sequelize = require('sequelize')

db
  .query(
    `
    select a.year, round(avg(r.score)) as avg, round(stddev_pop(r.score), 2) as stddev, percentile_disc(0.25) within group (order by r.score) as p25, percentile_disc(0.5) within group (order by r.score) as median, percentile_disc(0.75) within group (order by r.score) as p75
    from reviews r
    inner join albums a on a."albumId" = r."albumId"
    group by a.year
    order by a.year asc`,
    {type: Sequelize.QueryTypes.SELECT}
  )
  .then(result => {
    console.log(result)
    let reviews = JSON.stringify(result)

    fs.writeFile('./viz2/data/reviewsOverTime.json', reviews)
  }).then(() => {db.close()})


  // db
  // .query(
  //   'select a.year, round(avg(r.score)) as avg, percentile_disc(0.5) within group (order by r.score) as median, round(stddev_pop(r.score), 2) as stddev from reviews r inner join albums a  on a."albumId" = r."albumId" group by a.year order by a.year asc'
  // )
  // .spread((result, meta) => {
  //   console.log('results are ', result)
  //   console.log('meta', meta)
  // })
  // .then(result => {
  //   console.log(result)
  //   let reviews = JSON.stringify(result)

    // fs.writeFile('./viz2/data/reviewsOverTime.json', reviews)
  // })

  // , percentile_disc(0.5) within group (order by r.score) as median, round(stddev_pop(r.score), 2) as stddev

//   db
//   .query(
//     `
//     select round(avg(r.score)) as avg
//     from reviews r
// `,
//     {type: Sequelize.QueryTypes.SELECT}
//   )
//   .then(result => {
//     console.log(result)
//     let reviews = JSON.stringify(result)

//     // fs.writeFile('./viz2/data/reviewsOverTime.json', reviews)
//   })
