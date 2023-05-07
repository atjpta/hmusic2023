const mongoose = require("mongoose");
const DB = require("../models");
const Music = DB.music;
const Genre = DB.genre;
const Singer = DB.singer;
const Country = DB.country;
const Playlist = DB.playlist;
const ObjectId = mongoose.Types.ObjectId;

exports.searchMusic = async (req, res, next) => {
    const { keyword } = req.params
    try {
        const document = await Music.find({ name: { $regex: keyword, $options: 'i' } });
        return res.send(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể searchMusic' + error })
        )
    }
}

exports.searchSinger = async (req, res, next) => {
    const { keyword } = req.params
    try {
        const document = await Singer.find({ name: { $regex: keyword, $options: 'i' } });
        return res.send(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể searchSinger' + error })
        )
    }
}

exports.searchPlaylist = async (req, res, next) => {
    const { keyword } = req.params
    try {
        const document = await Playlist.find({ name: { $regex: keyword, $options: 'i' } });
        return res.send(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể searchPlaylist' + error })
        )
    }
}