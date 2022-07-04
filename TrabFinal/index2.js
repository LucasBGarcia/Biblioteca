//Insere linha na tebela caixa fechado
function InserLivroTbLivrosDisponiveis(tabela, titulo, autor, ano) {

    //obtém conteúdo da tabela livros
    var tbLivrosIndisponiveis = document.getElementById("tbLivrosIndisponiveis");
    //cria refência aos input da tabela livros 
    var ckExcluir = tbLivrosIndisponiveis.getElementsByTagName("input");

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

    if (confirm(`Confirma emprestimo do livro ${titulo}?`)) {
        //obtém item selecionado e joga em cada variavel (titulo, autor e ano)
        for (i = 1; i < ckExcluir.length; i++) {
            if (ckExcluir[i].checked) {
                titulo = tbLivrosIndisponiveis.rows[i].cells[0].textContent;
                autor = tbLivrosIndisponiveis.rows[i].cells[1].textContent;
                ano = tbLivrosIndisponiveis.rows[i].cells[2].textContent;


            }
        }

        //cria linha na tabela caixa fechado
        var linha = tabela.insertRow(-1);
        //insere colunas na linha criada
        var col1 = linha.insertCell(0);
        var col2 = linha.insertCell(1);
        var col3 = linha.insertCell(2);
        var col4 = linha.insertCell(3);
        //joga conteúdo nas colunas
        col1.textContent = titulo;
        col2.textContent = autor;
        col3.textContent = ano;
        col4.innerHTML = "<input type='checkbox'>";
    }
}


function obtemLivroDisponivel() {

    //Cria referência à tabela livros e ao input filho dela
    var dadosLivroDisponivel = document.getElementById("tbLivrosIndisponiveis");
    var ckExcluir = dadosLivroDisponivel.getElementsByTagName("input");
    //pega os itens selecionados e os salva no localStorage
    for (i = 0; i < ckExcluir.length; i++) {
        if (ckExcluir[i].checked) {
            titulo = dadosLivroDisponivel.rows[i].cells[0].textContent;
            autor = dadosLivroDisponivel.rows[i].cells[1].textContent;
            ano = dadosLivroDisponivel.rows[i].cells[2].textContent;
            RetornaLivroTbDisponiveis(titulo, autor, ano)
        }
    }
    //chama function de inserir linhas
    InserLivroTbLivrosDisponiveis(tbLivrosDisponiveis, titulo, autor, ano)
    //chama function deleta livros para remover os itens selecionados da tabela de caixa aberto
    deletaLivroIndisponiveis()

}
var btDevolver = document.getElementById("btDevolver");
btDevolver.addEventListener("click", obtemLivroDisponivel);


function RetornaLivroTbDisponiveis(titulo, autor, ano) {
    if (localStorage.getItem("tituloLivrosDisponiveis")) {
        var tituloLivrosDisponiveis = localStorage.getItem("tituloLivrosDisponiveis") + ";" + titulo;
        var autorLivrosDisponiveis = localStorage.getItem("autorLivrosDisponiveis") + ";" + autor;
        var anoLivrosDisponiveis = localStorage.getItem("anoLivrosDisponiveis") + ";" + ano;

        localStorage.setItem("tituloLivrosDisponiveis", tituloLivrosDisponiveis);
        localStorage.setItem("autorLivrosDisponiveis", autorLivrosDisponiveis);
        localStorage.setItem("anoLivrosDisponiveis", anoLivrosDisponiveis);
    } else {
        localStorage.setItem("tituloLivrosDisponiveis", titulo);
        localStorage.setItem("autorLivroDisponiveis", autor);
        localStorage.setItem("anoLivrosDisponiveis", ano);
    }
}

function salvaLivroIndisponivel(titulo, autor, ano, locatario) {
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


function deletaLivroIndisponiveis() {
    //cria referência as duas tabelas e ao input
    var tbLivrosIndisponiveis = document.getElementById("tbLivrosIndisponiveis");
    var ckExcluir = tbLivrosIndisponiveis.getElementsByTagName("input");

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
        localStorage.removeItem("tituloLivrosIndisponiveis");
        localStorage.removeItem("autorLivrosIndisponiveis");
        localStorage.removeItem("anoLivrosIndisponiveis");
        localStorage.removeItem("locatarioLivrosIndisponiveis");

        //obtem itens nao selecionados e os salvam na tabela
        for (i = 1; i < ckExcluir.length; i++) {
            if (!ckExcluir[i].checked) {
                titulo = tbLivrosIndisponiveis.rows[i].cells[0].textContent;
                autor = tbLivrosIndisponiveis.rows[i].cells[1].textContent;
                ano = tbLivrosIndisponiveis.rows[i].cells[2].textContent;
                locatario = tbLivrosIndisponiveis.rows[i].cells[3].textContent;
                salvaLivroIndisponivel(titulo, autor, ano, locatario);
            }
        }
        //deleta a linha selecionada
        for (i = ckExcluir.length - 1; i > 0; i--) {
            if (ckExcluir[i].checked) {
                tbLivrosIndisponiveis.deleteRow(i);
            }
        }
        ckExcluir[0].checked = false;
    }
}
