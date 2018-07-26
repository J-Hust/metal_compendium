var request = require('request-promise')
const jsdom = require('jsdom')
const {JSDOM} = jsdom
const db = require('../server/db')
const {Review} = require('../server/db/models')
let throttledRequest = require('throttled-request')(request)
let moment = require('moment')

throttledRequest.configure({
  requests: 2,
  milliseconds: 1000
})

const ScrapeReview = async () => {
  let dom

  let url1 =
    'http://www.metal-archives.com/review/ajax-list-browse/by/alpha/selection/'
  let url2 = '/json/1?sEcho=1&iColumns=7&sColumns=&iDisplayStart='
  let url3 =
    '&iDisplayLength=200&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5&mDataProp_6=6&iSortCol_0=2&sSortDir_0=asc&iSortingCols=1&bSortable_0=true&bSortable_1=false&bSortable_2=true&bSortable_3=false&bSortable_4=true&bSortable_5=true&bSortable_6=true&_=1463178246797'

    let letters = [
      // 'nbr',
      // 'a',
      // 'b',
      // 'c',
      // 'd',
      // 'e',
      // 'f',
      // 'g',
      // 'h',
      // 'i',
      // 'j',
      // 'k',
      // 'l',
      // 'm',
      // 'n',
      // 'o',
      // 'p',
      // 'q',
      // 'r',
      // 's',
      // 't',
      // 'u',
      // 'v',
      // 'w',
      // 'x',
      // 'y',
      'z'
    ]

  await letters.forEach(async letter => {
    let i = 1
    let total = 2
    let info
    let bandId
    let albumId
    let dateString
    let reviewId

    while (i <= total) {
      await throttledRequest(
        url1 + letter + url2 + i + url3,
        (err, response, body) => {
          if (err) {
            console.log('got an error', err)
          } else {
            info = JSON.parse(body)
            total = info.iTotalRecords
            info.aaData.forEach(async item => {
              reviewId = item[1]
                .split(' ')[1]
                .slice(item[1].split(' ')[1].lastIndexOf('/') + 1, -1)
              bandId = item[2]
                .split('/')[5]
                .slice(0, item[2].split('/')[5].indexOf('"'))
              albumId = item[3]
                .split('/')[6]
                .slice(0, item[3].split('/')[6].indexOf('"'))
              dateString =
                item[6].split(' ')[1].slice(0, -3) +
                item[6].split(' ')[0].slice(0, 3) +
                item[6].slice(-4)

              // console.log('reviewid', reviewId)
              // console.log('bandid', bandId)
              // console.log('albumid', albumId)
              // console.log('score', item[4].slice(0, -1))
              // console.log('reviewer', item[5].slice(item[5].indexOf('>') + 1, item[5].lastIndexOf('<')))
              // console.log('date', moment(dateString))

              await Review.create({
                reviewId: reviewId,
                bandId: bandId,
                albumId: albumId,
                score: item[4].slice(0, -1),
                reviewer: item[5].slice(
                  item[5].indexOf('>') + 1,
                  item[5].lastIndexOf('<')
                ),
                date: dateString
              })
            })
          }
        }
      )
      i = i + 200
    }
  })
}

module.exports = ScrapeReview

// let letters = ['nbr', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
