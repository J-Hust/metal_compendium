let NodeGeocoder = require('node-geocoder')
const db = require('../server/db')
const {Band} = require('../server/db/models')

let geocode = async () => {

  let geo = NodeGeocoder({provider: 'datasciencetoolkit'})
  const res = await Band.findAll({attributes: ['location', 'country']})

  const smallRes = res.slice(0,50)

  // geo.geocode(smallRes)
  // .then(result => {
  //   console.log(result)
  // })
}

geocode()
