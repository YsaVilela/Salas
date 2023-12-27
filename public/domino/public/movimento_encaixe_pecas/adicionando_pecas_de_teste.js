function adicionaPeca() {
    // Criar um novo elemento de peça
    var novaPeca = document.createElement("div");
    //novaPeca.textContent = "Nova Peça";

    // Adicionar a classe CSS "peca-mock" ao novo elemento
    novaPeca.classList.add("peca-mock");;

    var linhaNoMeio = document.createElement("div");
    linhaNoMeio.classList.add("linha-no-meio");
    novaPeca.appendChild(linhaNoMeio);

    // Encontrar o elemento do tabuleiro com a classe "tabuleiro-mock"
    var tabuleiro = document.querySelector(".tabuleiro");

    // Verificar se o tabuleiro foi encontrado
    if (tabuleiro) {
        // Adicionar a nova peça ao tabuleiro
        novaPeca.draggable = true;
        tabuleiro.appendChild(novaPeca);





    } else {
        console.error("Elemento do tabuleiro não encontrado.");
    }
}

function adicionaPecaEspecial() {
    // Criar um novo elemento de peça
    var novaPeca = document.createElement("div");
    //novaPeca.textContent = "Nova Peça";

    // Adicionar a classe CSS "peca-mock" ao novo elemento
    novaPeca.classList.add("peca-mock");
    novaPeca.classList.add("encaixavel");
    novaPeca.classList.add("ponta");
    novaPeca.classList.add("fixa");

    // Estilo para centralizar a peça no meio da tela
    novaPeca.style.position = "fixed";
    novaPeca.style.top = "50%";
    novaPeca.style.left = "50%";
    novaPeca.style.transform = "translate(-50%, -50%)";


    var linhaNoMeio = document.createElement("div");
    linhaNoMeio.classList.add("linha-no-meio");
    novaPeca.appendChild(linhaNoMeio);


    // Encontrar o elemento do tabuleiro com a classe "tabuleiro-mock"
    var tabuleiro = document.querySelector(".tabuleiro");

    // Verificar se o tabuleiro foi encontrado
    if (tabuleiro) {
        // Adicionar a nova peça ao tabuleiro
        novaPeca.draggable = true;
        tabuleiro.appendChild(novaPeca);

    } else {
        console.error("Elemento do tabuleiro não encontrado.");
    }
}



function desenhaTresPontos(peca) {
    // Adiciona três pontos à peça
    for (let i = 0; i < 3; i++) {
        const ponto = document.createElement("div");
        ponto.classList.add("ponto-3");
        peca.appendChild(ponto);
    }
}

function desenhaCincoPontos(peca) {
    // Adiciona três pontos à peça
    for (let i = 0; i < 5; i++) {
        const ponto = document.createElement("div");
        ponto.classList.add("ponto-5");
        peca.appendChild(ponto);
    }
}


// Exemplo de uso
document.addEventListener("DOMContentLoaded", function () {
    var pecas = document.querySelectorAll(".peca-mock");

    pecas.forEach(function (peca) {
        desenhaTresPontos(peca);
        desenhaCincoPontos(peca);
    });
});





adicionaPeca();
adicionaPeca();
adicionaPeca();
adicionaPeca();
adicionaPecaEspecial();
