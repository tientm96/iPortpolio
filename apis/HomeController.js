

var mongoose = require('mongoose');
var home = require('../model/home');
module.exports = function (app) {
    // http get
    app.get('/home', (req, res) => {
        home.find({}).then(item => {
            return res.json(item)
        })
    });

    // http get by id
    app.get('/home/id/:id', (req, res) => {
        var id = mongoose.Types.ObjectId(req.params.id);
        home.findOne({ _id: id }).then(item => {
            res.json(item);
        })
    });
    // get home by name 
    app.get('/home/name/:name', (req, res) => {
        var name = req.params.name;
        home.findOne({ name: name }).then(item => {
            res.json(item);
        })
    });

    // http  post 
    app.post('/home', (req, res) => {
        var Home = req.body;
        home.create(Home).then(() => {
            res.json(Home)
        })
            .catch((err) => {
                res.json(err)
            })
    });
    //  put home  by id  of home
    app.put('/home/:id', (req, res) => {
        var id = mongoose.Types.ObjectId(req.params.id);
        home.findOneAndUpdate({ _id: id }, req.body, { new: true }, function (err, home) {
            if (err)
                res.json(err);
            res.json(home);
        });

    })

    // delete  a home
    app.delete('/home/:id', (req, res) => {
        var id = mongoose.Types.ObjectId(req.params.id);
        home.remove({ _id: id }, (err, result) => {
            if (err)
                res.json(err);
            res.json({ _id: id });
        });
    });



}