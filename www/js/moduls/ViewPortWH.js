$(document).ready(function () {
    var mainDiv = $.parseHTML("<div class='view-port-wh' id='view-port-wh'> </div>");
    $(mainDiv).css("width", "120px");
    $(mainDiv).css("height", "30px");
    $(mainDiv).css("padding", "5");
    $(mainDiv).css("background-color", "black");
    $(mainDiv).css("color", "white");
    $(mainDiv).css("position", "fixed");
    $(mainDiv).css("bottom", "20px");
    $(mainDiv).css("right", "0");

    $('body').append(mainDiv);
    $('#view-port-wh').css('opacity', '0');

    var updateRun;

    $(window).resize(function () {
        $('#view-port-wh').css('opacity', '1');

        $('#view-port-wh').text("W:" + $(document).width() + "  *  H: " + $(document).height());

        clearTimeout(updateRun);
        updateRun = setTimeout(function () {
            $('#view-port-wh').delay(3000).animate({opacity: 0}, 500, function () {

            });

        }, 500);

    });

});
