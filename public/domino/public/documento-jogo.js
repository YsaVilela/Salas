import { verificarDisponibilidadeSala } from "../../telaDeInicio/socket-front-home.js";
import { verificarIdJogador, posicionarOponentes, salvarLocalStorage } from "./socket-front-jogo.js";

const socket = io('/jogo');

const parametros = new URLSearchParams(window.location.search);
const sala = parametros.get('sala');
const nomeJogador = parametros.get('nomeJogador');

socket.emit('selecionarSala', sala);

socket.on('salaCheia', () => {
    window.location.href = 'home.html';
});

socket.on('telaDeEspera', () => {
    document.getElementById('modal').style.display = 'flex';
});

socket.on('iniciarPartida', () => {
    document.getElementById('modal').style.display = 'none';
})

document.getElementById('sair').addEventListener('click', () => {
    socket.emit('encerrarPartida', sala);
});

socket.on('partidaEncerrada', (nomeSala, salas) => {
    window.location.href = 'home.html';
    verificarDisponibilidadeSala(nomeSala, salas);
});

socket.on('posicaoJogador', (numeroJogador) => {
    var idJogador = verificarIdJogador(numeroJogador);
    posicionarOponentes(idJogador)
})
