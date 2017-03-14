module.exports = class JsonServerWriter {

    constructor(express) {
        this.app = express;
        this.PATH = require('path');
        this.fs = require('fs');
        this.post();
    }

    post() {
        var that = this;

        this.app.post('/filefinder/find', function (req, res) {
            //
            var path = req.body.path;
            var searchedFileName = req.body.file;
            //
            walk(path, function (err, results) {//process.env.HOME
                //
                if (err)
                    throw err;
                //
                for (var i = 0; i < results.length; i++) {
                    if (stringContains(results[i], searchedFileName)) {
//                        res.end(results[i].split(path + "\\")[1]);// making relative path with split
                        res.json({result: results[i].split(path + "\\")[1]});
                        that.fs.close(2);
                    }
                }
            });
            //
        });

        var walk = function (dir, done) {
            var results = [];
            that.fs.readdir(dir, function (err, list) {
                if (err)
                    return done(err);
                var pending = list.length;
                if (!pending)
                    return done(null, results);
                list.forEach(function (file) {
                    file = that.PATH.resolve(dir, file);
                    that.fs.stat(file, function (err, stat) {
                        if (stat && stat.isDirectory()) {
                            walk(file, function (err, res) {
                                results = results.concat(res);
                                if (!--pending)
                                    done(null, results);
                            });
                        } else {
                            results.push(file);
                            if (!--pending)
                                done(null, results);
                        }
                    });
                });
            });
        };

        function stringContains(string, searched_string) {
            if (string.indexOf(searched_string) > -1) {
                return true;
            } else {
                return false;
            }
        }

    }

};