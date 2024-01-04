
var alunos = [
    {
        id: 1,
        name: "Pedro Antonio",
        email: "pedro.antonio@abutua.com",
        telefone: "(15) 99999-9999",
        curso: 1,
        turno: 1
    },
    {
        id: 2,
        name: "Carlos Silveira",
        email: "carlos.silveira@abutua.com",
        telefone: "(15) 99999-8888",
        curso: 2,
        turno: 2
    },
    {
        id: 3,
        name: "Maria Antonia",
        email: "maria.antonia@abutua.com",
        telefone: "(15) 99999-7777",
        curso: 3,
        turno: 3
    }
];

var cursos = [
    { id: 1, name: "Angular" },
    { id: 2, name: "Java" },
    { id: 3, name: "React" }
];

//Onload
loadAlunos();

//Carregar todos os Alunos
function loadAlunos() {
    for (let aluno of alunos) {
        addNewRow(aluno);
    }
}

//Salvar um Aluno
function save() {
    var novoAluno = {
        id: alunos.length + 1,
        name: document.getElementById("inputName").value,
        email: document.getElementById("inputEmail").value,
        telefone: document.getElementById("inputTelephone").value,
        curso: document.getElementById("selectCurso").value,
        turno: document.querySelector('input[name="radiosTurno"]:checked').value
    };

    addNewRow(novoAluno);
    alunos.push(novoAluno);
    document.getElementById("formAluno").reset();
}

function addNewRow(aluno) {
    //Acessar a Tabela de Alunos
    var table = document.getElementById("alunosTable");

    //Variável que Insere Dados na Tabela
    var newRow = table.insertRow();

    //Inserir id do Aluno
    var idNode = document.createTextNode(aluno.id);
    newRow.insertCell().appendChild(idNode);

    //inserir nome do Aluno
    var nameNode = document.createTextNode(aluno.name);
    newRow.insertCell().appendChild(nameNode);

    //inserir email do Aluno
    var emailNode = document.createTextNode(aluno.email);
    var cell = newRow.insertCell();
    cell.className = "d-none d-md-table-cell";
    cell.appendChild(emailNode);

    //inserir telefone do Aluno
    var telefoneNode = document.createTextNode(aluno.telefone);
    newRow.insertCell().appendChild(telefoneNode);

    //Inserir curso do Aluno
    var cursoNode = document.createTextNode(cursos[aluno.curso - 1].name);
    newRow.insertCell().appendChild(cursoNode);

    //Inserir turno do Aluno
    var turnoNode = "";

    if (aluno.turno == 1) {
        turnoNode = document.createTextNode("Manhã");
        newRow.insertCell().appendChild(turnoNode);
    } else if (aluno.turno == 2) {
        turnoNode = document.createTextNode("Tarde");
        newRow.insertCell().appendChild(turnoNode);
    } else {
        turnoNode = document.createTextNode("Noite");
        newRow.insertCell().appendChild(turnoNode);
    }
}