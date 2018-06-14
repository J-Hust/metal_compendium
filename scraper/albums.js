var request = require('request-promise')
const jsdom = require('jsdom')
const {JSDOM} = jsdom
const db = require('../server/db')
const {Album} = require('../server/db/models')
let throttledRequest = require('throttled-request')(request)

throttledRequest.configure({
  requests: 2,
  milliseconds: 1000
})

const scrapeAlbum = async () => {
  let dom

  let id = 745

  await db.sync()

  await throttledRequest(
    `https://www.metal-archives.com/band/discography/id/${id}/tab/all`,
    (err, response, body) => {
      if (err) {
        console.err('got an error', err)
      } else {
        dom = new JSDOM(body)

        Array.from(
          dom.window.document.getElementsByTagName('tbody')[0].children
        ).forEach(child => {
          let theurl = child.children[0].innerHTML.split(' ')[1]

          Album.create({
            bandId: id,
            albumId: theurl.slice(
              theurl.lastIndexOf('/') + 1, theurl.length - 1
            ),
            name: child.children[0].textContent,
            type: child.children[1].textContent,
            year: child.children[2].textContent,
            reviews: child.children[3].textContent.replace(/\s/g,'')
          })
        })
      }
    }
  )
}

scrapeAlbum()
