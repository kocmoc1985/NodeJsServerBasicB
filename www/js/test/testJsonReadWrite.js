$(document).ready(function () {

    var jsw = new JsonServerWriterRest();

    $('#writeJsonToFile').click(function () {

        jsw.write(101, {name: 'George Morge', age: '25', pnr: '9003269874'}, function (res) {
            console.log(res);
        });
    });


    $('#readJsonFromFile').click(function () {

        jsw.read(101, function (res) {
            console.log(res);
        });

    });


    $('#deleteJsonFile').click(function () {

        jsw.delete(101, function (res) {
            console.log(res);
        });

    });

});