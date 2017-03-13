$(document).ready(function () {
    addListeners();
});

function addListeners(){
    $('#showCrudTable').click(function(){
        TABLE_TEACHER.show(true);
    });
}