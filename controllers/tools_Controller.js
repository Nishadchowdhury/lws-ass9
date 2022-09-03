const fetch = require('node-fetch');
var jsonFile = require('../utils/DataBase/localDB.json')

const data = [...jsonFile]

module.exports.all = (req, res, next) => {
    const query = req.query;

    if (query.limit) {
        res.send(data.slice(0, query.limit))
    }

    res.send(data)


};

module.exports.random = (req, res, next) => {

    const no = Math.floor(Math.random() * data.length);

    console.log(no + data.length)

    res.send(data[no])

};


module.exports.save = (req, res, next) => {

    const dataFromHit = {
        ...req.body,
        id: data.length + 1
    };

    if (!dataFromHit.userID ||
        !dataFromHit.picture ||
        !dataFromHit.name ||
        !dataFromHit.gender ||
        !dataFromHit.contact ||
        !dataFromHit.address) {

        res.status(204).send({
            success: false,
            message: "No Content",

        })
    }




    data.push(dataFromHit)

    res.send(dataFromHit)

};


module.exports.update = (req, res, next) => {

    const dataFromHit = req.body;

    if (!dataFromHit.userID ||
        !dataFromHit.contact) {

        res.status(204).send({
            success: false,
            message: "No Content",

        })
    }


    const findData = data.findIndex(x => x.userID == dataFromHit.userID)
    const copyData = { ...data[findData], contact: dataFromHit.contact }
    data[findData] = copyData;

    res.send(data)

};

module.exports.bulk_Update = (req, res, next) => {

    const dataFromHit = req.body;
    const getData = [...dataFromHit]

    dataFromHit.map(i => {

        const findData = data.findIndex(x => x.userID == i.userID)
        const copyData = { ...data[findData], contact: i.contact }
        data[findData] = copyData;

    })

    res.send(data)

};


module.exports.delete = (req, res, next) => {


    const findID = req.body.userID;
    const findData = data.findIndex(x => x.userID == findID);
    data.splice(findData, 1)

    res.send({ ok: data })

};
