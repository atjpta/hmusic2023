const express = require("express");
const controllers = require('../controllers');
const ctl = controllers.cmt
module.exports = (app) => {
    const router = express.Router();
    router.route('/')
        .get(ctl.findAll)
        .post(ctl.create)
        .delete(ctl.deleteAll)

    router.route('/:id')
        .get(ctl.findOne)
        .put(ctl.update)
        .delete(ctl.deleteOne)

    router.route('/by/:id')
        .get(ctl.findOneBy)

    app.use("/api/cmt", router);
};