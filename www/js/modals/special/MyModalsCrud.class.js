class MyModalsCrud extends MyModals {
    
    constructor(path) {
        super(path);
    }

    registerListeners() {
        super.registerListeners();
        var that = this;
        $(document).ready(function () {
            that.addEventAdminModalPreviewElem();
        });
    }

    addEventAdminModalPreviewElem() {
        var that = this;
        $('body').on("click", ".admin-modal-preview", function (e) {
            e.stopPropagation();
            var id = $(this).data('_id');
            var rest = $(this).data('rest');
            //
            that.findById(rest, id, function (data) {
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

                that.showInfoModal('', '', cont);
            });
        });
    }

}