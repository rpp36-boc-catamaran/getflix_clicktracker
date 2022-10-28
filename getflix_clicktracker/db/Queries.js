/* eslint-disable no-multi-str */
const pool = require('./config.js')

const getClicks = (cb) => {
  const clicks = {
    text: 'SELECT userid, users.username, timestamp, webpage, object, movieid, movies.movietitle FROM clicks \
    LEFT OUTER JOIN users on users.id = clicks.userid \
    LEFT OUTER JOIN movies on movies.id = clicks.movieid \
    ORDER BY clicks.id DESC LIMIT 100',
    values: []
  }
  pool
    .query(clicks)
    .then((res) => {
      const data = res.rows
      cb(null, data)
    })
    .catch(e => {
      console.error(e.stack)
      cb(e.stack, null)
    })
}

const getClicksByUser = (userid, cb) => {
  const userclicks = {
    text: 'SELECT userid, users.username, timestamp, webpage, object, movieid, movies.movietitle FROM clicks \
    LEFT OUTER JOIN users on users.id = clicks.userid \
    LEFT OUTER JOIN movies on movies.id = clicks.movieid \
    WHERE users.id = $1 \
    ORDER BY clicks.id DESC LIMIT 100',
    values: [userid]
  }
  pool
    .query(userclicks)
    .then((res) => {
      const data = res.rows
      cb(null, data)
    })
    .catch(e => {
      console.error(e.stack)
      cb(e.stack, null)
    })
}

const getClicksByMovie = (movieid, cb) => {
  const movieclicks = {
    text: 'SELECT userid, users.username, timestamp, webpage, object, movieid, movies.movietitle FROM clicks \
    LEFT OUTER JOIN users on users.id = clicks.userid \
    LEFT OUTER JOIN movies on movies.id = clicks.movieid \
    WHERE movies.id = $1 \
    ORDER BY clicks.id DESC LIMIT 100',
    values: [movieid]
  }
  pool
    .query(movieclicks)
    .then((res) => {
      const data = res.rows
      cb(null, data)
    })
    .catch(e => {
      console.error(e.stack)
      cb(e.stack, null)
    })
}

const postClick = (data, cb) => {
  const upsertUser = {
    text: 'INSERT INTO users(id, username) VALUES ($1, $2) \
    ON CONFLICT (id) DO UPDATE SET username = excluded.username',
    values: [data.userid, data.username]
  }
  pool
    .query(upsertUser)
    .then(() => {
      if (data.movieid !== null) {
        const upsertMovie = {
          text: 'INSERT INTO movies(id, movietitle) VALUES ($1, $2) \
          ON CONFLICT (id) DO UPDATE SET movietitle = excluded.movietitle',
          values: [data.movieid, data.movietitle]
        }
        pool.query(upsertMovie)
        .then(() => {
          const now = Date.now()
          const upsertClick = {
            text: 'INSERT INTO clicks(userid, timestamp, webpage, object, movieid) \
            VALUES ($1, $2, $3, $4, $5)',
            values: [data.userid, now, data.webpage, data.object, data.movieid]
          }
          pool.query(upsertClick)
          .then(() => {
            cb(null, 'Created')
          })
          .catch(e => {
            console.error(e.stack)
            cb(e.stack, null)
          })
        })
        .catch(e => {
          console.error(e.stack)
          cb(e.stack, null)
        })
      } else {
        const now = Date.now()
        const upsertClick = {
          text: 'INSERT INTO clicks(userid, timestamp, webpage, object, movieid) \
          VALUES ($1, $2, $3, $4, $5)',
          values: [data.userid, now, data.webpage, data.object, data.movieid]
        }
        pool.query(upsertClick)
        .then(() => {
          cb(null, 'Created')
        })
        .catch(e => {
          console.error(e.stack)
          cb(e.stack, null)
        })
      }
    })
    .catch(e => {
      console.error(e.stack)
      cb(e.stack, null)
    })
}

module.exports.getClicks = getClicks
module.exports.getClicksByUser = getClicksByUser
module.exports.getClicksByMovie = getClicksByMovie
module.exports.postClick = postClick