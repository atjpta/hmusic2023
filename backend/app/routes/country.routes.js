
const express = require("express");
const controllers = require('../controllers');
const ctl = controllers.country
module.exports = (app) => {
    const router = express.Router();
    router.route('/')
        .get(ctl.findAll)
        .post(ctl.create)
        .delete(ctl.deleteAll)

    router.route('/select')
        .get(ctl.findAllSelect)

    router.route('/getLength')
        .get(ctl.getLength)

    router.route('/:id')
        .get(ctl.findOne)
        .put(ctl.update)
        .delete(ctl.deleteOne)

    router.route('/:page/:size')
        .get(ctl.findAllPage)

    app.use("/api/country", router);
};