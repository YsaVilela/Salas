function verificandoMaiorPeca() {
    var maiorPeca = document.getElementById('66');
    var divJogador = maiorPeca.parentElement.parentElement.parentElement;
    divJogador.classList.add('jogadorAtual');
}

export {verificandoMaiorPeca}