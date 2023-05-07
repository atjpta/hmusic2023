const auth = require('./auth.routes');
const users = require('./users.routes');
const genre = require('./genre.routes');
const artist = require('./artist.routes')
const singer = require('./singer.routes')
const country = require('./country.routes')
const music = require('./music.routes')
const favorite = require('./favorite.routes');
const playlist = require('./playlist.routes')
const image = require('./image.routes')
const song = require('./song.routes')
const cmt = require('./cmt.routes')
const search = require('./search.routes')

exports.Start = (app) => {
    auth(app)
    users(app)
    genre(app)
    artist(app)
    singer(app)
    country(app)
    music(app)
    favorite(app)
    playlist(app)
    song(app)
    image(app)
    cmt(app)
    search(app)
}
