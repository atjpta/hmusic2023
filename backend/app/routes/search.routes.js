const express = require("express");
const controllers = require('../controllers');
const ctl = controllers.search
module.exports = (app) => {
    const router = express.Router();


    router.route('/music/:keyword')
        .get(ctl.searchMusic)
    router.route('/singer/:keyword')
        .get(ctl.searchSinger)
    router.route('/playlist/:keyword')
        .get(ctl.searchPlaylist)


    app.use("/api/search", router);
};