function AdicionaLivro() {
    var inTitulo = document.getElementById("inTitulo");
    var inAutor = document.getElementById("inAutor");
    var inAno = document.getElementById("inAno");

    var titulo = inTitulo.value;
    var autor = inAutor.value;
    var ano = inAno.value;

    if (titulo == "" || autor == "" || ano == "") {
        alert("Algum campo não foi preenchido!");
        return;
    }

    var tbLivrosDisponiveis = document.getElementById("tbLivrosDisponiveis");

    InseriLinhaTbLivrosDisponiveis(tbLivrosDisponiveis, titulo, autor, ano);
    salvaLivro(titulo, autor, ano);

    inTitulo.value = "";
    inAutor.value = "";
    inAno.value = "";
    inTitulo.focus();
}

var btAdicionar = document.getElementById("btAdicionar");
btAdicionar.addEventListener("click", AdicionaLivro);

//Insere linha na tabela disponiveis
function InseriLinhaTbLivrosDisponiveis(tabela, titulo, autor, ano) {

    var linha = tabela.insertRow(-1);

    var col1 = linha.insertCell(0);
    var col2 = linha.insertCell(1);
    var col3 = linha.insertCell(2);
    var col4 = linha.insertCell(3);

    col1.textContent = titulo;
    col2.textContent = autor;
    col3.textContent = ano;
    col4.innerHTML = "<input type='checkbox'>";
}

//Insere linha na tebela indisponiveis
function InseriLinhaTbLivrosIndisponiveis(tabela, titulo, autor, ano, locatario) {

    //obtém conteúdo da tabela livros
    var tbLivrosDisponiveis = document.getElementById("tbLivrosDisponiveis");
    //cria refência aos input da tabela livros 
    var ckExcluir = tbLivrosDisponiveis.getElementsByTagName("input");

    var verificaSelecao = false;
    //verifica se algum input está selecionado, se estiver muda VERIFICASELECAO pra true
    for (var i = 1; i < ckExcluir.length; i++) {
        if (ckExcluir[i].checked) {
            verificaSelecao = true;
            break;
        }
    }

    if (!verificaSelecao) {
        alert('Selecione um Livro para emprestimo!');
        return;
    }

    if (confirm(`Confirma emprestimo do livro ${titulo} para ${locatario}?`)) {
        //obtém item selecionado e joga em cada variavel (titulo, autor e ano)
        for (i = 1; i < ckExcluir.length; i++) {
            if (ckExcluir[i].checked) {
                titulo = tbLivrosDisponiveis.rows[i].cells[0].textContent;
                autor = tbLivrosDisponiveis.rows[i].cells[1].textContent;
                ano = tbLivrosDisponiveis.rows[i].cells[2].textContent;


            }
        }

        //cria linha na tabela caixa fechado
        var linha = tabela.insertRow(-1);
        //insere colunas na linha criada
        var col1 = linha.insertCell(0);
        var col2 = linha.insertCell(1);
        var col3 = linha.insertCell(2);
        var col4 = linha.insertCell(3);
        var col5 = linha.insertCell(4);
        //joga conteúdo nas colunas
        col1.textContent = titulo;
        col2.textContent = autor;
        col3.textContent = ano;
        col4.textContent = locatario;
        col5.innerHTML = "<input type='checkbox' id='ckTodosIndisponiveis'>";
    }
}

function obtemLivroDisponivel() {

    var locatario = prompt('Nome do Locatario: ')
    //Cria referência à tabela livros e ao input filho dela
    var tbLivrosDisponiveis = document.getElementById("tbLivrosDisponiveis");
    var ckExcluir = tbLivrosDisponiveis.getElementsByTagName("input");
    //pega os itens selecionados e os salva no localStorage
    for (i = 0; i < ckExcluir.length; i++) {
        if (ckExcluir[i].checked) {
            titulo = tbLivrosDisponiveis.rows[i].cells[0].textContent;
            autor = tbLivrosDisponiveis.rows[i].cells[1].textContent;
            ano = tbLivrosDisponiveis.rows[i].cells[2].textContent;
            SalvaLivroTbIndisponivel(titulo, autor, ano, locatario)
        }
    }

    //chama function de inserir linhas
    InseriLinhaTbLivrosIndisponiveis(tbLivrosIndisponiveis, titulo, autor, ano, locatario)
    //chama function deleta livros para remover os itens selecionados da tabela de caixa aberto
    deletaLivro()


}
var btEntregar = document.getElementById("btEntregar");
btEntregar.addEventListener("click", obtemLivroDisponivel);

//Salva livros do caixa fechado
function SalvaLivroTbIndisponivel(titulo, autor, ano, locatario) {
    if (localStorage.getItem("tituloLivrosIndisponiveis")) {
        var tituloLivrosIndisponiveis = localStorage.getItem("tituloLivrosIndisponiveis") + ";" + titulo;
        var autorLivrosIndisponiveis = localStorage.getItem("autorLivrosIndisponiveis") + ";" + autor;
        var anoLivrosIndisponiveis = localStorage.getItem("anoLivrosIndisponiveis") + ";" + ano;
        var locatarioLivrosIndisponiveis = localStorage.getItem("locatarioLivrosIndisponiveis") + ";" + locatario;

        localStorage.setItem("tituloLivrosIndisponiveis", tituloLivrosIndisponiveis);
        localStorage.setItem("autorLivrosIndisponiveis", autorLivrosIndisponiveis);
        localStorage.setItem("anoLivrosIndisponiveis", anoLivrosIndisponiveis);
        localStorage.setItem("locatarioLivrosIndisponiveis", locatarioLivrosIndisponiveis);
    } else {
        localStorage.setItem("tituloLivrosIndisponiveis", titulo);
        localStorage.setItem("autorLivrosIndisponiveis", autor);
        localStorage.setItem("anoLivrosIndisponiveis", ano);
        localStorage.setItem("locatarioLivrosIndisponiveis", locatario);
    }
}

//salva livros do caixa aberto
function salvaLivro(titulo, autor, ano) {
    if (localStorage.getItem("tituloLivrosDisponiveis")) {
        var tituloLivrosDisponiveis = localStorage.getItem("tituloLivrosDisponiveis") + ";" + titulo;
        var autorLivrosDisponiveis = localStorage.getItem("autorLivrosDisponiveis") + ";" + autor;
        var anoLivrosDisponiveis = localStorage.getItem("anoLivrosDisponiveis") + ";" + ano;

        localStorage.setItem("tituloLivrosDisponiveis", tituloLivrosDisponiveis);
        localStorage.setItem("autorLivrosDisponiveis", autorLivrosDisponiveis);
        localStorage.setItem("anoLivrosDisponiveis", anoLivrosDisponiveis);

    } else {
        localStorage.setItem("tituloLivrosDisponiveis", titulo);
        localStorage.setItem("autorLivrosDisponiveis", autor);
        localStorage.setItem("anoLivrosDisponiveis", ano);
    }
}

//mantem a tabela preenchida quando atualizar a página
function atualizaTabela() {
    //caso tenha algo salvo no LocalStorage, divide o conteúdo nas variaveis e os joga na function de inserir linha
    if (localStorage.getItem("tituloLivrosDisponiveis")) {
        let titulos = localStorage.getItem("tituloLivrosDisponiveis").split(';');
        let autores = localStorage.getItem("autorLivrosDisponiveis").split(';');
        let anos = localStorage.getItem("anoLivrosDisponiveis").split(';');

        let tbLivrosDisponiveis = document.getElementById("tbLivrosDisponiveis");

        for (let i = 0; i < titulos.length; i++) {
            InseriLinhaTbLivrosDisponiveis(tbLivrosDisponiveis, titulos[i], autores[i], anos[i]);
        }
    }

    if (localStorage.getItem("tituloLivrosIndisponiveis")) {
        let titulosIndisponiveis = localStorage.getItem("tituloLivrosIndisponiveis").split(';');
        let autoresIndisponiveis = localStorage.getItem("autorLivrosIndisponiveis").split(';');
        let anosIndisponiveis = localStorage.getItem("anoLivrosIndisponiveis").split(';');
        let locatariosIndisponiveis = localStorage.getItem("locatarioLivrosIndisponiveis").split(';');

        let tbLivrosIndisponiveis = document.getElementById("tbLivrosIndisponiveis");

        for (i = 0; i < titulosIndisponiveis.length; i++) {
            titulosIndisponiveis[i]
            autoresIndisponiveis[i]
            anosIndisponiveis[i]
            locatariosIndisponiveis[i]

            var linha = tbLivrosIndisponiveis.insertRow(-1);

            var col1 = linha.insertCell(0);
            var col2 = linha.insertCell(1);
            var col3 = linha.insertCell(2);
            var col4 = linha.insertCell(3);
            var col5 = linha.insertCell(4);

            col1.textContent = titulosIndisponiveis[i];
            col2.textContent = autoresIndisponiveis[i];
            col3.textContent = anosIndisponiveis[i];
            col4.textContent = locatariosIndisponiveis[i];
            col5.innerHTML = "<input type='checkbox' id='ckTodosIndisponiveis'>";

        }
    }

}
atualizaTabela();

function deletaLivro() {
    //cria referência as duas tabelas e ao input
    var tbLivrosDisponiveis = document.getElementById("tbLivrosDisponiveis");
    var ckExcluir = tbLivrosDisponiveis.getElementsByTagName("input");

    var verificaSelecao = false;
    //verifica se algum input está selecionado e muda verifica para TRUE
    for (var i = 1; i < ckExcluir.length; i++) {
        if (ckExcluir[i].checked) {
            verificaSelecao = true;
            break;
        }
    }
    //mensagem caso tente remover sem selecionar
    if (!verificaSelecao) {
        alert('Selecione um Livro para remoção!');
        return;
    }
    //deleta as 3 tabelas para posteriormente salvar novamente sem os itens selecionados
    if (confirm(`O livro sera removido do acervo de livros disponiveis`)) {
        localStorage.removeItem("tituloLivrosDisponiveis");
        localStorage.removeItem("autorLivrosDisponiveis");
        localStorage.removeItem("anoLivrosDisponiveis");

        //obtem itens nao selecionados e os salvam na tabela
        for (i = 1; i < ckExcluir.length; i++) {
            if (!ckExcluir[i].checked) {
                titulo = tbLivrosDisponiveis.rows[i].cells[0].textContent;
                autor = tbLivrosDisponiveis.rows[i].cells[1].textContent;
                ano = tbLivrosDisponiveis.rows[i].cells[2].textContent;
                salvaLivro(titulo, autor, ano);
            }
        }
        //deleta a linha selecionada
        for (i = ckExcluir.length - 1; i > 0; i--) {
            if (ckExcluir[i].checked) {
                tbLivrosDisponiveis.deleteRow(i);
            }
        }
        ckExcluir[0].checked = false;
    }

}
var btRemove = document.getElementById("btRemove");
btRemove.addEventListener("click", deletaLivro);

const titulosIniciais = ['Como fazer sentido e bater o martelo;Sejamos todos feministas;Basquete 101']
const autoresIniciais = ['Alexandro Aolchique;Chimamanda Ngozi;Hortência Marcari']
const anosIniciais = ['2017;2015;2010']

function populateStorage() {

    localStorage.setItem("tituloLivrosDisponiveis", titulosIniciais);
    localStorage.setItem("autorLivrosDisponiveis", autoresIniciais);
    localStorage.setItem("anoLivrosDisponiveis", anosIniciais);

}

populateStorage();