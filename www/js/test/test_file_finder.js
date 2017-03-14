$(document).ready(function () {
    $("#testFindFile").click(function () {
        $.ajax({
            async: true,
            type: 'POST',
            dataType: 'json',
            url: "/filefinder/find",
//            processData: false,
//            headers: {"Content-Type": "application/json"},
            data: {path: 'www', file: 'HashMap.class.js'},
            success: function (data) {
                console.log("success: ", data);
//                cb(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("error: " + errorThrown);
//                cb(errorThrown);
            }
        });
    });
});