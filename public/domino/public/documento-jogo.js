import { criarPecas } from "./peca/peca.js";
import { reconhecerJogadores, desativarJogador, limparEspacoJogadores } from "./socket-front-jogo.js";
import { passarVez } from "./turnos/passarAVez.js";

const socket = io('/jogo');

const parametros = new URLSearchParams(window.location.search);
const sala = parametros.get('sala');
const nomeJogador = parametros.get('nomeJogador');

socket.emit('selecionarSala', sala, nomeJogador);

socket.on('salaCheia', () => {
    window.location.href = 'home.html';
});

socket.on('nomeExistente', () => {
    window.location.href = 'home.html';
});

socket.on('telaDeEspera', () => {
    document.getElementById('modal').style.display = 'flex';
});

socket.on('iniciarPartida', () => {
    document.getElementById('modal').style.display = 'none';
    criarPecas();
})

document.getElementById('sairEspera').addEventListener('click', () => {
    socket.emit('sairPartida', sala);
});

document.getElementById('sair').addEventListener('click', () => {
    socket.emit('sairPartida', sala);
});

socket.on('partidaEncerrada', () => {
    window.location.href = 'home.html';
});

socket.on('posicaoJogador', (jogadoresSalaEscolhida) => {
    reconhecerJogadores(jogadoresSalaEscolhida, nomeJogador);
});

socket.on('atualizarJogadores', (jogadoresSalaEscolhida) => {
    limparEspacoJogadores();
    reconhecerJogadores(jogadoresSalaEscolhida, nomeJogador);
});

socket.on('jogadorDesconectado', (jogadoresSalaEscolhida, socketId) => {
    desativarJogador(jogadoresSalaEscolhida, socketId);

    //adicionar função para redistribuir as peças
});

document.getElementById('btnPassarAVez').addEventListener('click', () => {
    console.log('clicou');
    socket.emit('passarAvez', sala);
});

socket.on('passarVez', () => {
    passarVez();
})

