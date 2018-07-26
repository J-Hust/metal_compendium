var request = require('request-promise')
const jsdom = require('jsdom')
const {JSDOM} = jsdom
const db = require('../server/db')
const {Album} = require('../server/db/models')
let throttledRequest = require('throttled-request')(request)
let fs = require('fs')

throttledRequest.configure({
  requests: 2,
  milliseconds: 1000
})

const scrapeAlbum = async id => {
  let dom

  await throttledRequest(
    `https://www.metal-archives.com/band/discography/id/${id}/tab/all`,
    (err, response, body) => {
      if (err) {
        console.log('got an error', err)
      } else if (body) {
        dom = new JSDOM(body)

        Array.from(
          dom.window.document.getElementsByTagName('tbody')[0].children
        ).forEach(child => {
          try {
            let theurl = child.children[0].innerHTML.split(' ')[1]

            let albumId = theurl.slice(
              theurl.lastIndexOf('/') + 1,
              theurl.length - 1
            )
            let name = child.children[0].textContent
            let type = child.children[1].textContent
            let year = child.children[2].textContent
            let reviewSummary = child.children[3].textContent.replace(/\s/g, '')
            Album.create({
              bandId: id,
              albumId: albumId,
              name: name,
              type: type,
              year: year,
              reviewSummary: reviewSummary
            })
          } catch(error) {
            //most likely there are no albums for this band.
            //write to file
            fs.writeFile('./err.txt', error + child.innerHTML)
          }
        })
      }
    }
  )
}

module.exports = scrapeAlbum
