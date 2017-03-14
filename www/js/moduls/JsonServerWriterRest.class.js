////@server-side-dependency: JsonServerWriter.class.ja


//jsw.write(101, {name: 'George Morge', age: '25', pnr: '9003269874'}, function (res) {
//            console.log(res);
//});

class JsonServerWriterRest {

    write(clientId, properties, cb) {
        properties.clientId = clientId;
        $.ajax({
            async: true,
            type: 'POST',
            dataType: 'json',
            url: "/jsonwriter/write",
//            processData: false,
//            headers: {"Content-Type": "application/json"},
            data: properties,
            success: function (data) {
//                console.log("success: ", data);
                cb(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("error: " + errorThrown);
                cb(errorThrown);
            }
        });
    }

    read(clientId, cb) {
        $.ajax({
            async: true,
            type: 'POST',
            dataType: 'json',
            url: "/jsonwriter/read",
            data: {clientId: clientId},
            success: function (data) {
//                console.log("success: ", data);
                cb(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
//                console.log("error: " + errorThrown);
                cb("error", errorThrown);
            }
        });
    }

    delete(clientId, cb) {
        $.ajax({
            async: true,
            type: 'POST',
            dataType: 'json',
            url: "/jsonwriter/delete",
            data: {clientId: clientId},
            success: function (data) {
//                console.log("success: ", data);
                cb(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
//                console.log("error: " + errorThrown);
                cb("error", errorThrown);
            }
        });
    }

}