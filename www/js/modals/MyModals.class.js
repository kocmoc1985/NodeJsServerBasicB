class MyModals {

    constructor(path) {
        this.PATH = path;
        this.registerListeners();
    }

    showInfoModal(title, infoMsg, customizedObj, size, type) {
        var modalObj = $.parseHTML(loadTemplate(PATH + "modal_info.html"));
        if (title) {
            $(modalObj).find(".modal-title").text(title);
        } else {
            $(modalObj).find('.modal-header').remove();
        }
        //
        //
        if (customizedObj) {
            $(modalObj).find(".modal-body").empty();
            $(modalObj).find(".modal-body").append(customizedObj);
        } else {
            $(modalObj).find(".modal-body").text(infoMsg);
        }
        //
        if (size === 'sm') {
            $(modalObj).find(".modal-dialog").addClass("modal-sm");
        } else if (size === 'lg') {
            $(modalObj).find(".modal-dialog").addClass("modal-lg");
        }
        //
        //available-types: 'warning','error',
        $(modalObj).find(".modal-header").addClass(type);
        //
        if (exists("#modal-info")) {
            $("#modal-info").remove();
            $("body").append(modalObj);
        } else {
            $("body").append(modalObj);
        }

        $('#modal-info').modal();
    }

    registerListeners() {
        $(document).ready(function () {
            addEventAdminModalPreviewElem();
        });
    }

    addEventAdminModalPreviewElem() {
        $('body').on("click", ".admin-modal-preview", function (e) {
            e.stopPropagation();
            var id = $(this).data('_id');
            var rest = $(this).data('rest');
            //
            findById(rest, id, function (data) {
                var cont = $("<div class='admin-modal-auto' style='text-align:center'></div>");
                //
                $.each(data, function (name, value) {
                    if (name.indexOf('_id') >= 0 || name.indexOf('__v') >= 0) {
                        return true;
                    }
                    //
                    if (Array.isArray(value) === false) {
                        var pName = $("<h3>" + name + "</h3>");
                        var pValue = $("<p>" + value + "</p>");
                        $(cont).append(pName);
                        $(cont).append(pValue);
                    } else { //is array
                        //Populating...
                        $(value).each(function (index, value_) {
                            //
                            $(cont).append('<hr>');
                            $.each(value_, function (key, val) {
                                //
                                if (Array.isArray(val) || key.indexOf('_id') >= 0 || key.indexOf('__v') >= 0) {
                                    return true;
                                }
                                //
                                var pName = $("<h4>" + key + "</h4>");
                                var pValue = $("<p>" + val + "</p>");
                                $(cont).append(pName);
                                $(cont).append(pValue);
                            });
                        });
                        return true;
                    }
                    //

                });

                showInfoModal('', '', cont);
            });
        });
    }

    loadTemplate(url) {
        //
        var html = $.ajax({
            url: url,
            type: "GET",
            dataType: 'html',
            async: false
        }).responseText;
        //
        return html;
    }

    exists(selector) {
        if ($(selector).length) {
            return true;
        } else {
            return false;
        }
    }

    findById(rest, id, cb) {
        rest.find(id, function (data) {
            if (data) {
                cb(data, true);
            } else {
                cb(data, false);
            }
        });
    }

}