const jogadores = ['primeiroJogador', 'segundoJogador', 'terceiroJogador', 'quartoJogador'];

let tempoRestante = 30;
let intervaloTempo;

function iniciarTempo() {
    intervaloTempo = setInterval(() => {
        if (tempoRestante <= 5 ) {
            document.querySelector('.tempoRestante').classList.add('acabandoTempo');
        }else{
            document.querySelector('.tempoRestante').classList.remove('acabandoTempo');
        }

        if (tempoRestante > 0) {
            document.querySelector('.tempoRestante').innerHTML = tempoRestante;
            tempoRestante--;
        } else {
            document.querySelector('.tempoRestante').innerHTML = tempoRestante;
            passarVez();
        }
    }, 1000);
}

function passarVez() {
    tempoRestante = 30;
    let jogadorAtual = document.querySelector('.jogadorAtual');
    let idJogador = jogadorAtual.id;

    jogadorAtual.classList.remove('jogadorAtual');
    let indiceJogadorAtual = jogadores.indexOf(idJogador);
    let proximoIndice = (indiceJogadorAtual + 1) % jogadores.length;
    let idProximoJogador = jogadores[proximoIndice];

    var proximoJogador = document.getElementById(idProximoJogador);
    proximoJogador.classList.add('jogadorAtual');
}

document.querySelector('.botaoPassarVez').addEventListener('click', passarVez);

export { iniciarTempo };