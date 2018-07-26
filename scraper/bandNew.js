var request = require('request-promise')
let scrapeBand = require('./bandSingle.js')
let scrapeAlbum = require('./albums.js')
let scrapeReview = require('./reviews.js')
const db = require('../server/db')
let throttledRequest = require('throttled-request')(request)
let fs = require('fs')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

throttledRequest.configure({
  requests: 2,
  milliseconds: 1000
})

const scrape = () => {

  let letters = ['nbr', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  let url1 = 'http://www.metal-archives.com/browse/ajax-letter/l/'
  let url2 = '/json/1?sEcho=2&iColumns=4&sColumns=&iDisplayStart='
  let url3 =
    '&iDisplayLength=2000&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&bSortable_0=true&bSortable_1=true&bSortable_2=true&bSortable_3=false&_=1462052260436'

  let info

  letters.forEach(letter => {
    let i = 1
    let total = 2
    let bandUrl
    let bandId

    while (i <= total) {
      throttledRequest(url1 + letter + url2 + i + url3).on('response', () => {
        info = JSON.parse(body)
            total = info.iTotalRecords
            info.aaData.forEach(item => {
              bandUrl = item[0].slice(
                item[0].indexOf("'") + 1,
                item[0].lastIndexOf("'")
              )

              bandId = bandUrl.slice(
                bandUrl.lastIndexOf('/') + 1,
                bandUrl.length
              )
      })
    }
  })
}
