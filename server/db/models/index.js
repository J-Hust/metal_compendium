const Band = require('./band')
const Album = require('./album')
const Review = require('./review')

// Album.belongsTo(Band)
// Band.hasMany(Album)
// Review.belongsTo(Album)
// Album.hasMany(Review)


module.exports = {
  Band,
  Album,
  Review
}
