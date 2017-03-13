var MYMODALS = new MyModals("js/modals/");

var STUDENT_REST = new REST('student');
var EDUCATION_REST = new REST('edu');
var TEACHERS_REST = new REST('teach');
var BOOKING_REST = new REST('book');
var CLASS_REST = new REST('class');
var LOGIN_SHEMA_REST = new REST('shemalogin'); // make adjustments to the shema, not the login operations
var ACCESS_REST = new REST('access');
//
var LOGIN_REST = new REST('login'); // FOR THE LOGIN OPERATIONS -> loginhandler.class.js


var TABLE_TEACHER = new Table(
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
    
    //=========================================================================
    
 
    
  