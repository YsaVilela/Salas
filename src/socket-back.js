import io from "./servidor.js";

const home = io.of('/home');
const jogo = io.of('/jogo');

var salas = {
    "Sala1": 'emAberto',
    "Sala2": 'emAberto',
    "Sala3": 'emAberto',
    "Sala4": 'emAberto'
};

var jogadores = [];

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

    socket.on('selecionarSala', (nomeSala, nomeJogador) => {
        var quantidadeJogadores = verificarQuantidadeDeJogadores(nomeSala);
        const limiteSala = 4;
        var numeroJogador;

        if (quantidadeJogadores < limiteSala) {
            if (jogadores.find(jogador => jogador.nomeJogador == nomeJogador)) {
                jogo.to(socket.id).emit('nomeExistente');
                removerObjetoPorSocketId(socket.id);
            } else {
                socket.join(nomeSala);
                jogo.to(nomeSala).emit('telaDeEspera');
                numeroJogador = verificarQuantidadeDeJogadores(nomeSala);
                jogadores.push({ socketId: socket.id, nomeSala: nomeSala, posicaoJogador: numeroJogador, nomeJogador: nomeJogador });
                var jogadoresSalaEscolhida = jogadores.filter(jogador => jogador.nomeSala == nomeSala);
                jogo.to(nomeSala).emit('posicaoJogador', jogadoresSalaEscolhida);

                // jogadores.forEach(jogador => {
                //     console.log(`socketId: ${jogador.socketId}, nomeSala: ${jogador.nomeSala}, posicaoJogador: ${jogador.posicaoJogador}, nomeJogador: ${jogador.nomeJogador}`);
                // });
            }
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


    socket.on('passarAvez', (nomeSala) => {
        jogo.to(nomeSala).emit('passarVez');
    });

    socket.on('sairPartida', (nomeSala) => {
        jogo.to(socket.id).emit('partidaEncerrada', salas);

        verificarPossibilidadeDeContinuacaoDaPartida(nomeSala);

        var estadoSala = salas[nomeSala];
        var jogadoresSalaEscolhida = jogadores.filter(jogador => jogador.nomeSala == nomeSala);
        if (estadoSala == 'partidaEmAndamento') {
            jogo.to(nomeSala).emit('jogadorDesconectado', jogadoresSalaEscolhida, socket.id);
        }

        removerObjetoPorSocketId(socket.id);
    });

    // Quando a conexão é encerrada
    socket.on('disconnect', () => {
        console.log('Usuário desconectado');

        const referer = socket.handshake.headers.referer;

        const parametros = new URLSearchParams(new URL(referer).search);
        const nomeSala = parametros.get('sala');

        verificarPossibilidadeDeContinuacaoDaPartida(nomeSala);

        var estadoSala = salas[nomeSala];

        var jogadoresSalaEscolhida = jogadores.filter(jogador => jogador.nomeSala == nomeSala);
        if (estadoSala == 'partidaEmAndamento') {
            jogo.to(nomeSala).emit('jogadorDesconectado', jogadoresSalaEscolhida, socket.id);
        }

        removerObjetoPorSocketId(socket.id);
        if (estadoSala == 'emAberto') {
            jogadoresSalaEscolhida = jogadores.filter(jogador => jogador.nomeSala == nomeSala);
            jogo.to(nomeSala).emit('atualizarJogadores', jogadoresSalaEscolhida);
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

function removerObjetoPorSocketId(socketId) {
    const index = jogadores.findIndex(jogador => jogador.socketId === socketId);
    if (index !== -1) {
        jogadores.splice(index, 1);
        for (let i = index; i < jogadores.length; i++) {
            jogadores[i].posicaoJogador = i + 1;
        }
    }
}

function verificarPossibilidadeDeContinuacaoDaPartida(nomeSala) {
    var sala = jogo.adapter.rooms.get(nomeSala);
    var quantidadeConexoes = sala ? sala.size : 0;

    var estadoSala = salas[nomeSala];

    if (estadoSala == 'partidaEmAndamento' && quantidadeConexoes < 3) {
        salas[nomeSala] = 'emAberto';
        jogo.to(nomeSala).emit('partidaEncerrada', salas);
    }
}