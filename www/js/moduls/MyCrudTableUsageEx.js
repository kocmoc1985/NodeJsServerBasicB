var TABLE_TEACHER = new MyCrudTable(
        'teacher',
        true,
        TEACHERS_REST,
        'Administrera lärare',
        '#output',
        ['Namn', 'Pnr', 'Epost'],
        ['name', 'pnr', 'epost'],
        {_fields: '', _sort: 'name', _skip: 0, _limit: 15},
        'name',
        '_educations',
        {name: 'Education', score: 'Score'},
        {name: EDUCATION_REST}
);

A_TABLE.addSelectOptions(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], 'nr');
A_TABLE.addSelectOptionsRest(CLASS_REST, {_fields: 'size', _sort: 'size', _skip: 0, _limit: 10}, 'size');
A_TABLE.addSelectOptions(['true', 'false'], 'projector');
A_TABLE.setShowAlwaysInvert();

A_TABLE.setSpecialUrl(_findEduTeach({name: actEdu}));


function _findEduTeach(obj) {
    return "findEduTeach/" + JSON.stringify(obj);
}