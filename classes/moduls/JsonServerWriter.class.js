'use strict';
//ClientSide: JsonServerWriterRest
module.exports = class JsonServerWriter {

    constructor(express) {
        this.app = express;
        this.fs = require('fs');
        this.post();
    }

    getFileName(clientId) {
        return "file_" + clientId + ".json";
    }

    post() {
        var that = this;
        this.app.post('/jsonwriter/write', function (req, res) {
            //
            var clientId = req.body.clientId;
            //
            var arr = [];
            //
            console.log("req.body", req.body);
            //
            arr.push(req.body);
            //
            var json = JSON.stringify(arr);
            //
            that.fs.readFile(that.getFileName(clientId), 'utf8', function (err, data) {
                if (err) {
                    that.fs.writeFile(that.getFileName(clientId), json, 'utf8', function (err) {
                        res.json({write: 'ok'});
                        that.fs.close(2);
                    });
                } else {
                    var arr_ = JSON.parse(data);
                    arr_.push(req.body); //add some data
                    json = JSON.stringify(arr_); //convert it back to json
                    that.fs.writeFile(that.getFileName(clientId), json, 'utf8', function (err) {
                        res.json({write: 'ok'});
                        that.fs.close(2);
                    });
                }
                //
            });
        });


        this.app.post('/jsonwriter/read', function (req, res) {
            //
            var clientId = req.body.clientId;
            //
            that.fs.readFile(that.getFileName(clientId), 'utf8', function (err, data) {
                if (err) {
                    res.end("");
                    that.fs.close(2);
                } else {
                    var json = JSON.parse(data);
                    res.json(json);
                }
            });
        });


        this.app.post('/jsonwriter/delete', function (req, res) {
            //
            var clientId = req.body.clientId;
            //
            that.fs.unlink(that.getFileName(clientId), function () {
                res.json({delete: 'ok'});
                that.fs.close(2);
            });
            //
        });


    }

};