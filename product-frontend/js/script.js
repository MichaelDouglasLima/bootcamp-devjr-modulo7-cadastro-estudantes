
// var alunos = [
//     {
//         id: 1,
//         name: "Pedro Antonio",
//         email: "pedro.antonio@abutua.com",
//         telefone: "(15) 99999-9999",
//         curso: 1,
//         turno: 1
//     },
//     {
//         id: 2,
//         name: "Carlos Silveira",
//         email: "carlos.silveira@abutua.com",
//         telefone: "(15) 99999-8888",
//         curso: 2,
//         turno: 2
//     },
//     {
//         id: 3,
//         name: "Maria Antonia",
//         email: "maria.antonia@abutua.com",
//         telefone: "(15) 99999-7777",
//         curso: 3,
//         turno: 3
//     }
// ];

// var cursos = [
//     { id: 1, name: "Angular" },
//     { id: 2, name: "Java" },
//     { id: 3, name: "React" }
// ];

// Data
var students = [];
var courses = [];

// Onload
loadCourses();
loadStudents();

// Load all courses
function loadCourses() {
    $.ajax({
            url : "http://localhost:8080/courses",
            type : "GET",
            async : false,
            success : (response) => {
                courses = response;
                for (var course of courses) {
                    document.getElementById("selectCourse").innerHTML += `<option value=${course.id}>${course.name}</option>`;
                }
            }
    });
}

// Load all students
function loadStudents() {
    $.getJSON("http://localhost:8080/students", (response) => {
        students = response;
        for (let student of students) {
            addNewRow(student);
        }
    });
}

// Save a Student
function save() {
    var newStudent = {
        id: students.length + 1,
        name: document.getElementById("inputName").value,
        email: document.getElementById("inputEmail").value,
        phone: document.getElementById("inputPhone").value,
        idCurso: document.getElementById("selectCourse").value,
        period: document.querySelector("input[name='radiosPeriod']:checked").value
    };

    $.ajax({
        url: "http://localhost:8080/students",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(newStudent),
        success: (newStudent) => {
            addNewRow(newStudent);
            students.push(newStudent);
            document.getElementById("formStudent").reset();
        }
    }); 
}

function addNewRow(student) {
    // Acessar a Tabela de Alunos
    var table = document.getElementById("studentsTable");

    // Variável que Insere Dados na Tabela
    var newRow = table.insertRow();

    // Inserir id do Aluno
    var idNode = document.createTextNode(student.id);
    newRow.insertCell().appendChild(idNode);

    // inserir nome do Aluno
    var nameNode = document.createTextNode(student.name);
    newRow.insertCell().appendChild(nameNode);

    // inserir email do Aluno
    var emailNode = document.createTextNode(student.email);
    var cell = newRow.insertCell();
    cell.className = "d-none d-md-table-cell";
    cell.appendChild(emailNode);

    // inserir telefone do Aluno
    var phoneNode = document.createTextNode(student.phone);
    newRow.insertCell().appendChild(phoneNode);

    // Inserir curso do Aluno
    var courseNode = document.createTextNode(courses[student.idCurso - 1].name);
    newRow.insertCell().appendChild(courseNode);

    // Inserir turno do Aluno
    var periodNode = "";

    if (student.period == 1) {
        periodNode = document.createTextNode("Manhã");
        newRow.insertCell().appendChild(periodNode);
    } else if (student.period == 2) {
        periodNode = document.createTextNode("Tarde");
        newRow.insertCell().appendChild(periodNode);
    } else {
        periodNode = document.createTextNode("Noite");
        newRow.insertCell().appendChild(periodNode);
    }
}