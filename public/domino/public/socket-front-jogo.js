function verificarIdJogador(numeroJogador) {
    switch (numeroJogador) {
        case 1:
            return 'primeiroJogador';

        case 2:
            return 'segundoJogador';

        case 3:
            return 'terceiroJogador';

        case 4:
            return 'quartoJogador';
    }
}

function posicionarOponentes(idJogador) {
    console.log('simsim');
}




export { verificarIdJogador, posicionarOponentes, salvarLocalStorage }