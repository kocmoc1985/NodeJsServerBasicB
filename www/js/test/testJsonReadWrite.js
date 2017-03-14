$(document).ready(function () {
    $('#writeJsonToFile').click(function () {
        
        $.ajax({
            async: true,
            type: 'POST',
            dataType: 'json',
            url: "http://localhost:3000/writeJson",
            data: {param1: "aa", param2: "bb", param3: "cc", param4: "dd"},
            success: function (data) {
                console.log(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest, textStatus);
            }
        });
        
    });
});