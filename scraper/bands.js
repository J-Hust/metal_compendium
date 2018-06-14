var request = require('request-promise')
let scrapeBand = require('./bandSingle.js')
const db = require('../server/db')
let throttledRequest = require('throttled-request')(request)

throttledRequest.configure({
  requests: 2,
  milliseconds: 1000
})

const scrape = async () => {
  await db.sync({force: true})

  let letters = ['nbr', 'z']

  let url1 = 'http://www.metal-archives.com/browse/ajax-letter/l/'
  let url2 = '/json/1?sEcho=2&iColumns=4&sColumns=&iDisplayStart='
  let url3 =
    '&iDisplayLength=2000&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&bSortable_0=true&bSortable_1=true&bSortable_2=true&bSortable_3=false&_=1462052260436'

  let info

  await letters.forEach(async letter => {
    let i = 1
    let total = 2
    let bandUrl
    while (i <= total) {
      await throttledRequest(url1 + letter + url2 + url3, (err, response, body) => {
        if (err) {
          console.log('got an error', err)
        } else {
          info = JSON.parse(body)
          total = info.iTotalRecords
          info.aaData.forEach(async item => {
            bandUrl = item[0].slice(
              item[0].indexOf("'") + 1,
              item[0].lastIndexOf("'")
            )
            scrapeBand(bandUrl)
          })
        }
      })
      i = i + 499
    }
  })
}

scrape()

db.close()
