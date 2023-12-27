function redirecionar(botaoClicado) {
    var sala = botaoClicado.parentNode.id;
    var nome = document.getElementById('nome').value;
    if (nome) {
        window.location.href = `jogo.html?sala=${sala}&nomeJogador=${nome}`;
    } else {
        var avisoAnterior = document.querySelector('.inserirNome').querySelector('.aviso');
        if(!avisoAnterior){
            document.getElementById('nome').classList.add('invalido');
            var aviso = document.createElement('p');
            aviso.textContent = '*Nome de usuário é obrigatório';
            aviso.classList.add('aviso');
            document.querySelector('.inserirNome').appendChild(aviso);
        }
    }
}

