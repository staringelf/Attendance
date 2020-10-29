/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
 

/* STUDENT APPLICATION */


var model = {
		
	init: function () {
		if(!localStorage.studentsRecord) {
			var i, j;
			console.log('Creating Attendance records...');
			
			for (i = 0; i < this.students.length; i++) {
				var student = this.students[i];
				for(j = 0; j < this.totalDays; j++){
					student.attendence[j] = octopus.getRandomBoolean();
				}
 			}
			this.setDaysAttended();
			octopus.updateLocalStorage();
		}
		else{
			this.students = JSON.parse(localStorage.getItem('studentsRecord'));
		}
	},
	
	setDaysAttended: function () {
		var i, j;
		for(i = 0; i < this.students.length; i++)
			for(j = 0; j < this.totalDays; j++)
				this.updateDaysAttended(i, j, false);
	},
	
	updateDaysAttended(roll, day, isClickEvent){
		var i, daysAttended = 0;
		var student = this.students[roll];
		for(i = 0; i < this.totalDays; i++){
				if(student.attendence[i])
					daysAttended++;
		}
		student.daysAttended = daysAttended;
		if(isClickEvent)
			octopus.updateLocalStorage();
	},
	
	totalDays: 12,
	
	students: [
		{
		  name: 'Slappy the Frog',
		  attendence: [],
		  daysAttended: 0
		},
		
		{
		  name: 'Lily the Lizrad',
		  attendence: [],
		  daysAttended: 0
		},
		
		{
		  name: 'Paulrus the Walrus',
		  attendence: [],
		  daysAttended: 0
		},
		
		{
		  name: 'Gregory the Goat',
		  attendence: [],
		  daysAttended: 0
		},
		
		{
		  name: 'Adam the Anaconda',
		  attendence: [],
		  daysAttended: 0
		}
	],
};

var octopus = {
	
	init: function () {
		model.init();
		view.init();
	},
	
	getRandomBoolean: function () {
		return Math.random() > 0.5;
	},
	
	getStudents: function () {
		return model.students;
	},
	
	getTotalDays: function () {
		return model.totalDays;
	},
	
	getDaysMissed: function (roll) {
		return model.totalDays - model.students[roll].daysAttended;
	},
	
	toggleAttendenceInput: function (roll, day) {
		var student = model.students[roll];
		student.attendence[day] = !student.attendence[day];
		model.updateDaysAttended(roll, day, true);
		view.render();
	},
	
	updateLocalStorage: function () {
		localStorage.setItem('studentsRecord', JSON.stringify(model.students));
	}
	
};

var view = {
	
	init: function () {
		this.tableBody = document.querySelector('tbody');
		this. totalDays = octopus.getTotalDays();
		this.render();
	},
	
	setUpEventListeners: function () {
		var i, j;
		var students = octopus.getStudents();
		var studentTr = document.querySelectorAll('tbody tr');
		for(i = 0; i < studentTr.length; i++){
			var attendenceInputs = studentTr[i].querySelectorAll('input');
			for(j = 0; j < attendenceInputs.length; j++){
				attendenceInputs[j].addEventListener('click', function (roll, day) {
					return function (e) {
						octopus.toggleAttendenceInput(roll, day);
					}
				}(i, j));
			}
		}
	},
	
	render: function () {
		var i, j; //iterators
		var students = octopus.getStudents();
		this.tableBody.innerHTML = '';
		for(i = 0; i < students.length; i++){
			var student = students[i];
			var studentRow = document.createElement('tr');
			studentRow.classList.add('student');
			this.tableBody.appendChild(studentRow);
			var studentNametd = document.createElement('td');
			studentNametd.classList.add('name-col');
			studentNametd.textContent = students[i].name;
			studentRow.appendChild(studentNametd);
			for(j = 0; j < this.totalDays; j++){
				var checked;
				var Attendancetd = document.createElement('td');
				Attendancetd.classList.add('attend-col');
				checked = student.attendence[j] ? 'checked' : '';
				Attendancetd.innerHTML = '<input type="checkbox"' + checked + '>';
				studentRow.appendChild(Attendancetd);
			}
			var daysMissedtd = document.createElement('td');
			daysMissedtd.classList.add('missed-col');
			daysMissedtd.textContent = octopus.getDaysMissed(i);
			studentRow.appendChild(daysMissedtd);
		}
		this.setUpEventListeners();
	}
};
/*
$(function() {
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }

    // Check boxes, based on attendace records
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
}());
*/

octopus.init();


/* Need to rewrite in vanilla js
(function() {
	debugger;
    if (!localStorage.attendance) {
		debugger;
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }
		
		debugger;

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
			debugger;
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());*/

