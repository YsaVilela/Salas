import { atualizaQuantidadeJogadores, verificarDisponibilidadeSala } from "./socket-front-home.js";

const socket = io('/home');

socket.on('atualizaQuantidadeJogadores', (nomeSala, quantidadeDeJogadores, salas) => {
    verificarDisponibilidadeSala(nomeSala, salas);
    atualizaQuantidadeJogadores(nomeSala, quantidadeDeJogadores);
});

socket.on('partidaIniciada', (salas, nomeSala) => {
    verificarDisponibilidadeSala(nomeSala, salas);
});




