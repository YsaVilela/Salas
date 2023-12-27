import io from "./servidor.js";

const home = io.of('/home');
const jogo = io.of('/jogo');

var salas = {
    "Sala1": 'emAberto',
    "Sala2": 'emAberto',
    "Sala3": 'emAberto',
    "Sala4": 'emAberto'
};

home.on("connection", (socket) => {
    console.log("Um cliente se conectou. ID da conexão:", socket.id);

    verificarTodasAsSalas();

    // Quando a conexão é encerrada
    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

jogo.on("connection", (socket) => {
    console.log("Um cliente se conectou no jogo. ID da conexão:", socket.id);

    socket.on('selecionarSala', (nomeSala) => {
        var quantidadeJogadores = verificarQuantidadeDeJogadores(nomeSala);
        const limiteSala = 4;
        var numeroJogador;

        if (quantidadeJogadores < limiteSala) {
            socket.join(nomeSala);
            jogo.to(nomeSala).emit('telaDeEspera');
            numeroJogador = verificarQuantidadeDeJogadores(nomeSala);
            jogo.to(nomeSala).emit('posicaoJogador', numeroJogador)
        }

        var estadoSala = salas[nomeSala];
        if (estadoSala == 'partidaEmAndamento') {
            jogo.to(socket.id).emit('salaCheia');
        }

        if (numeroJogador == limiteSala) {
            jogo.to(nomeSala).emit('iniciarPartida');
            salas[nomeSala] = 'partidaEmAndamento';
            home.emit('partidaIniciada', salas, nomeSala);
        }
    });

    socket.on('encerrarPartida', (nomeSala) => {
        salas[nomeSala] = 'emAberto';
        jogo.to(nomeSala).emit('partidaEncerrada', salas);
    });

    // Quando a conexão é encerrada
    socket.on('disconnect', () => {
        console.log('Usuário desconectado');

        const referer = socket.handshake.headers.referer;

        const parametros = new URLSearchParams(new URL(referer).search);
        const nomeSala = parametros.get('sala');

        var sala = jogo.adapter.rooms.get(nomeSala);
        var quantidadeConexoes = sala ? sala.size : 0;

        if (quantidadeConexoes < 3) {
            salas[nomeSala] = 'emAberto';
            jogo.to(nomeSala).emit('partidaEncerrada', salas);
        }

        verificarQuantidadeDeJogadores(nomeSala);
    });
});

function verificarTodasAsSalas() {
    verificarQuantidadeDeJogadores('Sala1');
    verificarQuantidadeDeJogadores('Sala2');
    verificarQuantidadeDeJogadores('Sala3');
    verificarQuantidadeDeJogadores('Sala4');
}

function verificarQuantidadeDeJogadores(nomeSala) {
    var sala = jogo.adapter.rooms.get(nomeSala);
    var quantidadeConexoes = sala ? sala.size : 0;
    home.emit("atualizaQuantidadeJogadores", nomeSala, quantidadeConexoes, salas);
    return quantidadeConexoes;
}