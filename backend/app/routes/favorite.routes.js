const express = require("express");
const controllers = require('../controllers');
const ctl = controllers.favorite
const withoutDuplicates = require("../middlewares/withoutDuplicates");

module.exports = (app) => {
    const router = express.Router();
    router.route('/')
        .get(ctl.findAll)
        .post([withoutDuplicates.checkDuplicateFavorite], ctl.create)
        .delete(ctl.deleteAll)



    router.route('/:id')
        .get(ctl.findOne)
        .put(ctl.update)
        .delete(ctl.deleteOne)

    router.route('/sl/:model_id')
        .get(ctl.findSlBy)

    router.route('/:model_id/:user')
        .get(ctl.findOneByUser)


    router.route('/model/:modelType/:user')
        .get(ctl.findModelByUSer)

    app.use("/api/favorite", router);
};