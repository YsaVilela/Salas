function reconhecerJogadores(jogadoresSalaEscolhida, nomeJogador) {
    var jogador = jogadoresSalaEscolhida.find(jogador => jogador.nomeJogador == nomeJogador);
    var numeroJogadorPrincipal = jogador.posicaoJogador;
    posicionarOponentes(jogador, jogadoresSalaEscolhida, numeroJogadorPrincipal)
}

function posicionarOponentes(jogador, jogadoresSalaEscolhida, numeroJogador) {
    switch (numeroJogador) {
        case 1:
            posicionarJogadorPrincipal(jogador);
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 2)) {
                var jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 2);
                var idJogador = verificarIdJogador(jogador.posicaoJogador);
                posicionarJogadores(idJogador, jogador);
            }
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 3)) {
                var jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 3);
                var idJogador = verificarIdJogador(jogador.posicaoJogador);
                posicionarJogadores(idJogador, jogador);
            }
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 4)) {
                var jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 4);
                var idJogador = verificarIdJogador(jogador.posicaoJogador);
                posicionarJogadores(idJogador, jogador);
            }
            break;
        case 2:
            posicionarJogadorPrincipal(jogador);
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 1)) {
                var jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 1);
                var idJogador = verificarIdJogador(4);
                posicionarJogadores(idJogador, jogador);
            }
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 3)) {
                var jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 3);
                var idJogador = verificarIdJogador(2);
                posicionarJogadores(idJogador, jogador);
            }
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 4)) {
                var jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 4);
                var idJogador = verificarIdJogador(3);
                posicionarJogadores(idJogador, jogador);
            }
            break;
        case 3:
            posicionarJogadorPrincipal(jogador);
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 1)) {
                var jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 1);
                var idJogador = verificarIdJogador(3);
                posicionarJogadores(idJogador, jogador);
            }
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 2)) {
                var jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 2);
                var idJogador = verificarIdJogador(4);
                posicionarJogadores(idJogador, jogador);
            }
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 4)) {
                var jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 4);
                var idJogador = verificarIdJogador(2);
                posicionarJogadores(idJogador, jogador);
            }
            break;
        case 4:
            posicionarJogadorPrincipal(jogador);
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 1)) {
                var jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 1);
                var idJogador = verificarIdJogador(2);
                posicionarJogadores(idJogador, jogador);
            }
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 2)) {
                var jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 2);
                var idJogador = verificarIdJogador(3);
                posicionarJogadores(idJogador, jogador);
            }
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 3)) {
                var jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 3);
                var idJogador = verificarIdJogador(4);
                posicionarJogadores(idJogador, jogador);
            }
            break;
    }
}

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

function posicionarJogadores(idPosicaoJogador, jogador) {
    const espacoJogador = document.querySelector(`.${idPosicaoJogador}`);
    espacoJogador.querySelector('.nome').textContent = jogador.nomeJogador;
    var idJogador = verificarIdJogador(jogador.posicaoJogador);
    var posicaoJogador = espacoJogador.querySelector('.jogador');
    posicaoJogador.id = idJogador;
}

function posicionarJogadorPrincipal(jogador) {
    const espacoJogador = document.querySelector('.primeiroJogador');
    espacoJogador.querySelector('.nome').textContent = jogador.nomeJogador;
    var idJogador = verificarIdJogador(jogador.posicaoJogador);
    var posicaoJogador = espacoJogador.querySelector('.jogador');
    posicaoJogador.id = idJogador;
}

function desativarJogador(jogadoresSalaEscolhida, socketId) {
    var jogador = jogadoresSalaEscolhida.find(jogador => jogador.socketId == socketId);
    var idJogador = verificarIdJogador(jogador.posicaoJogador);
    console.log(idJogador);
    document.getElementById(idJogador).classList.add('jogadorDesativado');
}

function limparEspacoJogadores() {
    var nomes = document.querySelectorAll('.nome');
    nomes.forEach(nome => {
        nome.textContent = '';
    })
}

export { reconhecerJogadores, desativarJogador, limparEspacoJogadores }