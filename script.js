

/**
 * Define all global variables here
 */

/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array = [];
/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
var inputIds = ['#studentName', '#course','#studentGrade'];
/**
 * addClicked - Event Handler when user clicks the add button
 */

function addClick(){
    $('#add').click(function(){
        console.log('Click Add is working');
        addStudent();
        $('input').val('');
    });

}
function deleteClick(deletethis){
    console.log('click delete is working');
     student_array.splice($(deletethis).closest('tr').index(), 1);
    $(deletethis).closest('tr').remove();

}
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClick(){
    $('#cancel').click(function(){
        console.log('Click Cancel is working');
        $('input').val('');
    });
}
function getDataClick(){
    $('#getData').click(function(){
        console.log('Click data is working');
        upDateStudentList();
        calculateAverage();
    });
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent() {
    var studentObj = {};
    studentObj.name = $(inputIds[0]).val();
    studentObj.course = $(inputIds[1]).val();
    studentObj.grade = $(inputIds[2]).val();
    if (studentObj.name === "" || studentObj.course === "" || isNaN(studentObj.grade)) {
        return
    } else{
        student_array.push(studentObj);
        addStudentToDom(studentObj);
        calculateAverage();
    }
}

/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
var gradeTotal = null;
var grade_average = null;
var gradeAdd;
// var inputCalc = [];
function calculateAverage(){
    for (var i = 0; i < student_array.length-1; i++){
        gradeTotal = 0;
       // var inputCalc = [];
        // inputCalc.push(parseInt($(inputIds[2]).val()));
        // gradeTotal += $(inputIds[2]).val();
        gradeTotal += parseInt( student_array[i].grade);
        grade_average = (gradeTotal / (student_array.length)).toFixed(1);
        $('.avgGrade').text(grade_average);
        }
    }

/**
 * updateData - centralized function to update the average and call student list update
 */

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function upDateStudentList(){
    $.ajax({
        dataType: 'json',
        method: 'post',
        url: 'https://s-apis.learningfuze.com/sgt/get',
        data: {'api_key': 'ulgwGsmmZV'},
        success: function (result) {
            console.log(result);
            var upDatedStudentArray = null;
            for (var j = 0; j < result.data.length; j++) {
                upDatedStudentArray = result.data[j];
                student_array.push(upDatedStudentArray);
                addStudentToDom(upDatedStudentArray);
            }
            calculateAverage();
        }
    })
}

function upDateToServerAdd(){
    $.ajax({
        dataType: 'json',
        method: 'post',
        url: 'https://s-apis.learningfuze.com/sgt/get',
        data: {
            'api_key': 'ulgwGsmmZV',

        },
    })
}

function upDateToServerDelete(){
    $.ajax ({
        url:'https://s-apis.learningfuze.com/sgt/delete',
        success: function(result) {

        }

    })
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(studentObj){
    var nameStudent = '<td>'+ studentObj.name +'</td>';
    var courseStudent = '<td>'+ studentObj.course +'</td>';
    var gradeStudent = '<td>'+ studentObj.grade +'</td>';
    var deleteStudent = '<td>'+ '<button type="button" class="btn btn-danger " onclick="deleteClick(this)" id="delete">Delete</button>' + '</td>';
    var holdData = $('<tr>').append(nameStudent,courseStudent,gradeStudent,deleteStudent);
    $('#tbody').append(holdData);
}

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */


/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function(){
    init();
});
function init(){
    addClick();
    cancelClick();
    getDataClick();
}