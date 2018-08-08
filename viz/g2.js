//import db
const db = require('../server/db')
const {Band} = require('../server/db/models')
const fs = require('fs')
const Sequelize = require('sequelize')


const getStuff = async () => {
  let genreMatrix = {}

  const res = await Band.findAll({attributes: ['genre']})

  // this doesn't actually return the text.  Isn't Sequelize great?
  // const res = await db.query("select regexp_replace(lower(genre), '(/,)|(influences)|(and)|(with)|(elements)|( metal(?!core))|(\(.+?\))', '', 'g') from bands")



  res.forEach(row => {
    let theSplit = row.dataValues.genre
      .toLowerCase()
      .replace(/,|influences|and|with|metal|elements|\(.+?\)/g, '')
      .split(/[\s\/]+/)
    theSplit.forEach(word => {
      if (!genreMatrix[word]) {
        genreMatrix[word] = {}
      }
      for (let i = 0; i < theSplit.length; i++) {
        if (theSplit[i] === word  || theSplit[i] === 'metal') {
          //do nothing
        } else if (genreMatrix[word][theSplit[i]]) {
          genreMatrix[word][theSplit[i]]++
        } else {
          genreMatrix[word][theSplit[i]] = 1
        }
      }
    })
  })

  console.log('my object', genreMatrix)

  let csvString = 'genre1,genre2,count\n'
  for (let genre1 in genreMatrix) {
    if (genreMatrix.hasOwnProperty(genre1) && genre1 !== '') {
      // csvString = csvString + genre1 + ','
      for (let genre2 in genreMatrix[genre1])
        if (genreMatrix[genre1].hasOwnProperty(genre2) && genre2 !== '') {
          csvString =
            csvString +
            genre1 +
            ',' +
            genre2 +
            ',' +
            genreMatrix[genre1][genre2] +
            '\n'
        }
    }
  }

  fs.writeFile('g2.csv', csvString, err => {
    if (err) throw err
  })

  db.close()
}

let chordDiagram = () => {
  let outerRadius = 960 / 2,
    innerRadius = outerRadius - 130

  let fill = d3.scale.category20c()

  let chord = d3.layout
    .chord()
    .padding(0.04)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending)

  let arc = d3.svg
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(innerRadius + 20)

  let svg = d3
    .select('body')
    .append('svg')
    .attr('width', outerRadius * 2)
    .attr('height', outerRadius * 2)
    .append('g')
    .attr('transform', 'translate(' + outerRadius + ',' + outerRadius + ')')
}

getStuff()
