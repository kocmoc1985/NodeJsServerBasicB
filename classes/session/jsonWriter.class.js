'use strict';
module.exports = class JSONReadWrite {

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
        this.app.post('/writeJson', function (req, res) {
            //
            var text = req.body.param1;
            var index = req.body.param2;
            var clientId = req.body.param3;
            //
            console.log("text: " +text,"index: " + index, "clientId: " + clientId);
            //
            var entry = {
                table: []
            };
            //
            entry.table.push({index: index, text: text, done: 'false'});
            //
            var json = JSON.stringify(entry);
            //
            that.fs.readFile(that.getFileName(clientId), 'utf8', function (err, data) {
                if (err) {
                    that.fs.writeFile(that.getFileName(clientId), json, 'utf8', function (err, data) {
                        res.end("A: " + data + "//  err: " + err);
                        that.fs.close(2);
                    });
                } else {
                    var obj = JSON.parse(data); //now it an object
                    obj.table.push({index: index, text: text, done: 'false'}); //add some data
                    json = JSON.stringify(obj); //convert it back to json
                    that.fs.writeFile(that.getFileName(clientId), json, 'utf8', function (err, data) {
                        res.end("B: " + data + "//  err: " + err);
                        that.fs.close(2);
                    });
                }
                //
            });
        });


        this.app.post('/readJson', function (req, res) {
            //
            var clientId = req.body.param1;
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


        this.app.post('/deleteJsonFile', function (req, res) {
            //
            var clientId = req.body.param1;
            //
            that.fs.unlink(that.getFileName(clientId), function () {
                res.end("");
                that.fs.close(2);
            });
            //
        });


    }

};