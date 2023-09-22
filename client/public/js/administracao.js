// Função para ocultar todas as tabelas
function ocultarTabelas() {
    var tabelas = document.querySelectorAll("table");
    for (var i = 0; i < tabelas.length; i++) {
        tabelas[i].style.display = "none";
    }
}

function limparClasseActive() {
    var botoesCategorias = document.querySelectorAll(".categorias button");
    botoesCategorias.forEach(function (botao) {
        botao.classList.remove("active");
    });
}

// Inicialmente, mostre a tabela "Geral"
document.getElementById("tabelaGeral").style.display = "table";

var botoesCategorias = document.querySelectorAll(".categorias button");

// Adiciona um evento de clique para cada botão de categoria
document.getElementById("btnAlunos").addEventListener("click", function () {
    ocultarTabelas();
    document.getElementById("tabelaAlunos").style.display = "table";
    limparClasseActive();
    document.getElementById("btnAlunos").classList.add("active");
});

document.getElementById("btnProfessores").addEventListener("click", function () {
    ocultarTabelas();
    document.getElementById("tabelaProfessores").style.display = "table";
    limparClasseActive();
    document.getElementById("btnProfessores").classList.add("active");
});

document.getElementById("btnFuncionarios").addEventListener("click", function () {
    ocultarTabelas();
    document.getElementById("tabelaFuncionarios").style.display = "table";
    limparClasseActive();
    document.getElementById("btnFuncionarios").classList.add("active");
});

document.getElementById("btnGeral").addEventListener("click", function () {
    ocultarTabelas();
    document.getElementById("tabelaGeral").style.display = "table";
});

// Função para exibir a tabela geral e ocultar as outras
function exibirTabelaGeral() {
    ocultarTabelas(); // Oculta todas as tabelas de categoria

    // Seleciona todas as linhas das tabelas de alunos, professores e funcionários
    var linhasAlunos = document.querySelectorAll("#tabelaAlunos tbody tr");
    var linhasProfessores = document.querySelectorAll("#tabelaProfessores tbody tr");
    var linhasFuncionarios = document.querySelectorAll("#tabelaFuncionarios tbody tr");

    // Seleciona a tabela geral e seu corpo (tbody)
    var tabelaGeral = document.getElementById("tabelaGeral");
    var corpoTabelaGeral = tabelaGeral.querySelector("tbody");

    // Limpa o corpo da tabela geral
    corpoTabelaGeral.innerHTML = "";

    // Adiciona as linhas das tabelas de alunos, professores e funcionários à tabela geral
    corpoTabelaGeral.innerHTML += Array.from(linhasAlunos).map(row => row.outerHTML).join("");
    corpoTabelaGeral.innerHTML += Array.from(linhasProfessores).map(row => row.outerHTML).join("");
    corpoTabelaGeral.innerHTML += Array.from(linhasFuncionarios).map(row => row.outerHTML).join("");

    // Exibe a tabela geral
    tabelaGeral.style.display = "table";

    // Remove a classe "active" de todos os botões de categoria
    limparClasseActive();

    // Adiciona a classe "active" ao botão "Geral" para destacá-lo
    document.getElementById("btnGeral").classList.add("active");
}

// Adiciona um evento de clique para o botão "Geral" para exibir a tabela geral
document.getElementById("btnGeral").addEventListener("click", exibirTabelaGeral);

// Exibe a tabela geral assim que a página for carregada
window.addEventListener("load", exibirTabelaGeral);

document.getElementById("importButton").addEventListener("click", function () {
    document.getElementById("fileInput").click();
});

document.getElementById("fileInput").addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
        const fileName = file.name.toLowerCase();
        if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls") || fileName.endsWith(".csv")) {
            console.log("Arquivo selecionado: " + fileName);
        } else {
            alert("Por favor, selecione um arquivo válido com extensão .xlsx, .xls ou .csv.");
        }
    }
});