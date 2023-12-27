function atualizaQuantidadeJogadores(nomeSala, quantidadeDeJogadores) {
    var cardSala = document.getElementById(nomeSala);
    cardSala.querySelector('.quantidadeJogadores').textContent = `${quantidadeDeJogadores}/4`;
}

function verificarDisponibilidadeSala(nomeSala, salas) {
    var estadoSala = salas[nomeSala];
    if(estadoSala == 'partidaEmAndamento'){
        desativarBotao(nomeSala);
    }else{
        reativarBotao(nomeSala);
    }
}

function reativarBotao(nomeSala) {
    var cardSala = document.getElementById(nomeSala);
    if (cardSala.querySelector('.aviso')) {
        cardSala.querySelector('.btnEntrar').classList.remove('desativado')
        cardSala.querySelector('.aviso').remove();
    }
}

function desativarBotao(nomeSala) {
    var cardSala = document.getElementById(nomeSala);
    if (!cardSala.querySelector('.aviso')) {
        cardSala.querySelector('.btnEntrar').classList.add('desativado')
        var aviso = document.createElement('p');
        aviso.textContent = 'Partida em Andamento';
        aviso.classList.add('aviso');
        cardSala.appendChild(aviso);
    }
}

export {atualizaQuantidadeJogadores, verificarDisponibilidadeSala}