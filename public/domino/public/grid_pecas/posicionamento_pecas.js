import { iniciarTempo } from "../turnos/passarAVez.js";
import { verificandoMaiorPeca } from "../turnos/verificacaoMaiorPeca.js";

function posicionarPeças(dados) {
    var jogador = dados.jogador;
    var divJogador = document.getElementById(jogador);
    const quantidadePecas = dados.pecas.length;

    var posicaoDasPecas = divJogador.querySelector('.conjuntoPecas')

    dados.pecas.forEach(elemento => {
        posicaoDasPecas.appendChild(elemento);
    });

    if (jogador == "primeiroJogador" || jogador == "terceiroJogador") {
        posicaoDasPecas.style.gridTemplateColumns = `repeat(${quantidadePecas}, 1fr)`;
    }

    var pecas = divJogador.querySelector('.quantidadePecas');
    pecas.textContent = `(${quantidadePecas} peças)`
}

//mock distribuição de peças
function distribuirPecas() {
    var peca1 = document.getElementById('00');
    var peca2 = document.getElementById('01');
    var peca3 = document.getElementById('02');
    var peca4 = document.getElementById('03');
    var peca5 = document.getElementById('04');
    var peca6 = document.getElementById('05');
    var peca7 = document.getElementById('06');

    var peca8 = document.getElementById('11');
    var peca9 = document.getElementById('12');
    var peca10 = document.getElementById('13');
    var peca11 = document.getElementById('14');
    var peca12 = document.getElementById('15');
    var peca13 = document.getElementById('16');
    var peca14 = document.getElementById('22');

    var peca15 = document.getElementById('23');
    var peca16 = document.getElementById('24');
    var peca17 = document.getElementById('25');
    var peca18 = document.getElementById('26');
    var peca19 = document.getElementById('33');
    var peca20 = document.getElementById('34');
    var peca21 = document.getElementById('35');

    var peca22 = document.getElementById('36');
    var peca23 = document.getElementById('44');
    var peca24 = document.getElementById('45');
    var peca25 = document.getElementById('46');
    var peca26 = document.getElementById('55');
    var peca27 = document.getElementById('56');
    var peca28 = document.getElementById('66');

    const pecasJogador1 = [peca1, peca2, peca3, peca4, peca5, peca6, peca7];
    const pecasJogador2 = [peca8, peca9, peca10, peca11, peca12, peca13, peca14];
    const pecasJogador3 = [peca15, peca16, peca17, peca18, peca19, peca20, peca21];
    const pecasJogador4 = [peca22, peca23, peca24, peca25, peca26, peca27, peca28];

    posicionarPeças({ pecas: pecasJogador1, jogador: "primeiroJogador" });
    posicionarPeças({ pecas: pecasJogador2, jogador: "segundoJogador" });
    posicionarPeças({ pecas: pecasJogador3, jogador: "terceiroJogador" });
    posicionarPeças({ pecas: pecasJogador4, jogador: "quartoJogador" });

    verificandoMaiorPeca();
    iniciarTempo();
}

export {distribuirPecas}