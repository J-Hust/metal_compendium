var request = require("request-promise");
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const db = require('../server/db')
const {Band} = require('../server/db/models')
let throttledRequest = require('throttled-request')(request)

throttledRequest.configure({
  requests: 3,
  milliseconds: 1000
})



let scrapeBand = async (url) => {

  let dom

  await throttledRequest(url, async (err, response, body) => {
    if (err){
      console.log('got an errror', err)
    } else {
      dom = new JSDOM(body)

      await Band.create({
        bandId: url.slice(url.lastIndexOf('/')+1, url.length),
        name: dom.window.document.getElementById('band_info').children[0].textContent,
        country: dom.window.document.getElementById('band_stats').children[0].children[1].textContent,
        location: dom.window.document.getElementById('band_stats').children[0].children[3].textContent,
        status: dom.window.document.getElementById('band_stats').children[0].children[5].textContent,
        formed_in: dom.window.document.getElementById('band_stats').children[0].children[7].textContent,
        genre: dom.window.document.getElementById('band_stats').children[1].children[1].textContent,
        lyrical_themes: dom.window.document.getElementById('band_stats').children[1].children[3].textContent,
        last_label: dom.window.document.getElementById('band_stats').children[1].children[5].textContent,
        years_active: dom.window.document.getElementById('band_stats').children[2].children[1].textContent.replace(/\s/g,'')

      })

    }
  })
}

module.exports = scrapeBand


// //id
// console.log('id', url.slice(url.lastIndexOf('/')+1, url.length))

// //name
// console.log(dom.window.document.getElementById('band_info').children[0].textContent)

// //country
// console.log(dom.window.document.getElementById('band_stats').children[0].children[1].textContent)

// //location
// console.log(dom.window.document.getElementById('band_stats').children[0].children[3].textContent)

// //status
// console.log(dom.window.document.getElementById('band_stats').children[0].children[5].textContent)

// //formed in
// console.log(dom.window.document.getElementById('band_stats').children[0].children[7].textContent)

// //genre
// console.log(dom.window.document.getElementById('band_stats').children[1].children[1].textContent)

// //lyrical themes
// console.log(dom.window.document.getElementById('band_stats').children[1].children[3].textContent)

// //last label
// console.log(dom.window.document.getElementById('band_stats').children[1].children[5].textContent)

// //years active
// let something = dom.window.document.getElementById('band_stats').children[2].children[1].textContent.replace(/\s/g,'')
// console.log(something)
