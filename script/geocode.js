var request = require('request-promise')
let axios = require('axios')
const db = require('../server/db')
const Sequelize = require('sequelize')

const getstuff = async () => {
  let stuff = await db.query(
    'select "bandId", name, location, country from bands where lat is null order by name asc',
    {type: Sequelize.QueryTypes.SELECT}
  )

  let geostuff, lat, lng, res, id

  for (let i = 0 ; i < stuff.length; i++) {
    try {
      console.log('i = ', i, ', band = ', stuff[i].name)
      geostuff = await axios.get(
        `http://www.datasciencetoolkit.org/maps/api/geocode/json?sensor=false&address=${
          stuff[i].location
        }%2c${stuff[i].country}`
      )

      if (geostuff.data.results[0]) {
        lat = geostuff.data.results[0].geometry.location.lat
        lng = geostuff.data.results[0].geometry.location.lng
        id = String(stuff[i].bandId)

        res = await db.query(
          `UPDATE bands SET lat = ${lat}, lng = ${lng} WHERE "bandId" = ${id}::varchar`
        )
      }
    } catch(err) {
      console.log(err.message)
      if (err.status === 500) {db.close()}
    }
  }
  console.log('closing db')
  db.close()
}

// const geo = (loc, country) => {
//   axios
//     .get(
//       'http://www.datasciencetoolkit.org/maps/api/geocode/json?sensor=false&address=Berlin%2cGermany'
//     )
//     .then(result => console.log(result.data.results[0].geometry.location)) //gives lat and lon
// }

// geo()
getstuff()
