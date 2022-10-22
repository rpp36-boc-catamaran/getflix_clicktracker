const pgQuery = require('./Queries.js')

const clicks = (cb) => {
  pgQuery.getClicks((err, data) => {
    if (err) {
      cb(err, null)
    } else {
      cb(null, data)
    }
  })
}

const clicksByUser = (userid, cb) => {
  pgQuery.getClicksByUser(userid, (err, data) => {
    if (err) {
      cb(err, null)
    } else {
      cb(null, data)
    }
  })
}

const clicksByMovie = (movieid, cb) => {
  pgQuery.getClicksByMovie(movieid, (err, data) => {
    if (err) {
      cb(err, null)
    } else {
      cb(null, data)
    }
  })
}

const addClick = (clickData, cb) => {
  pgQuery.postClick(clickData, (err, data) => {
    if (err) {
      cb(err, null)
    } else {
      cb(null, data)
    }
  })
}

module.exports.clicks = clicks
module.exports.clicksByUser = clicksByUser
module.exports.clicksByMovie = clicksByMovie
module.exports.addClick = addClick