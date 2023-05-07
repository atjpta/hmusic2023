const mongoose = require("mongoose");
const DB = require("../models");
const model = DB.favorite;
const ObjectId = mongoose.Types.ObjectId;

exports.findModelByUSer = async (req, res, next) => {
    const { modelType, user } = req.params;
    try {
        const document = await model.find({ modelType: modelType, user: user, model: { $ne: null } }).populate({
            path: 'model',
            match: { _id: { $ne: null } }
        });
        return res.json(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy findAll' + error })
        )
    }
};



exports.findSlBy = async (req, res, next) => {
    const { model_id } = req.params;
    try {
        const document = await model.find({ model: model_id, })
        return res.json(document.length);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy findAll' + error })
        )
    }
};

exports.findOneByUser = async (req, res, next) => {
    const { model_id, user } = req.params;

    try {
        const document = await model.findOne({ model: model_id, user: user })
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy model" }));
        }
        return res.json(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy findOneByUser' + error })
        )
    }
}

exports.create = async (req, res, next) => {
    const modelO = new model({
        user: req.body.user,
        model: req.body.model,
        modelType: req.body.modelType,
    })

    try {
        const document = await modelO.save();
        return res.json({ Message: 'da them model thanh cong' + document });
    } catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể tao model +++ ${error} ` })
        )
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const document = await model.find().populate({
            path: 'model',
        })
        return res.json(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy findAll' + error })
        )
    }
};

exports.findOne = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await model.findOne(condition).populate('model', 'id name')
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy model" }));
        }
        return res.json(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy findOne' + error })
        )
    }
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(
            res.status(400).json({ Message: "thông tin không thế thay đổi" })
        )
    }
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await model.findByIdAndUpdate(condition, req.body, {
            new: true
        });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy model" }));
        }
        return res.send({ message: "đã update thành công", body: req.body });
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể update model với id = ${req.params.id} ` })
        )
    }
}


exports.deleteOne = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await model.findOneAndDelete(condition);
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy model" }));
        }
        return res.send({ message: "đã xóa model thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa model với id = ${req.params.id} ` + error })
        )
    }
}
exports.deleteAll = async (req, res, next) => {
    try {
        const data = await model.deleteMany({});
        return res.send({ message: `${data.deletedCount}  model đã xóa thành công` });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả model` + error })
        )
    }
}
