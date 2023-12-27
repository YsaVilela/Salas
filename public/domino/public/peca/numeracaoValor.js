function MeiaPeca(props) {

    var idPeca = props.id;
    var numeroSuperior = props.numeroSuperior;
    var numeroInferior = props.numeroInferior;

    function temPontoDeDomino(indice, lado) {
        const numero = lado === 'superior' ? numeroSuperior : numeroInferior;

        switch (numero) {
            case 0:
                return false;
            case 1:
                return indice === 4;
            case 2:
                return indice === 0 || indice === 8;
            case 3:
                return indice === 0 || indice === 4 || indice === 8;
            case 4:
                return indice === 0 || indice === 2 || indice === 6 || indice === 8;
            case 5:
                return indice === 0 || indice === 2 || indice === 4 || indice === 6 || indice === 8;
            case 6:
                return indice === 0 || indice === 3 || indice === 6 || indice === 2 || indice === 5 || indice === 8;
            default:
                return false;
        }
    }

    function criarElementoPontoDeDomino(indice, lado) {
        if (temPontoDeDomino(indice, lado)) {
            const pontoDeDomino = document.createElement('div');
            pontoDeDomino.className = 'ponto-de-domino';
            pontoDeDomino.style.width = '5px';
            pontoDeDomino.style.height = '5px';
            pontoDeDomino.style.backgroundColor = 'black';
            pontoDeDomino.style.position = 'absolute';
    
            // Ajustar posição para centralizar na célula
            const leftPosition = (indice % 3) * 33.33 + 8.33;
            const topPosition = Math.floor(indice / 3) * 33.33 + 8.33;
    
            pontoDeDomino.style.left = `calc(${leftPosition}% + 0.5px)`;
            pontoDeDomino.style.top = `calc(${topPosition}% + 2px)`;
    
            return pontoDeDomino;
        } else {
            return null;
        }
    }
    
    function criarLinhaTabela(indiceLinha, lado) {
        const linha = document.createElement('tr');
        linha.className = `linha-tabuleiro ${lado}`;

        for (let i = 0; i < 3; i++) {
            const celula = document.createElement('td');
            const pontoDeDomino = criarElementoPontoDeDomino(indiceLinha * 3 + i, lado);
            if (pontoDeDomino) {
                celula.appendChild(pontoDeDomino);
            }
            linha.appendChild(celula);
        }
        return linha;
    }

    function criarParteInferior() {
        const corpoTabelaInferior = document.createElement('tbody');
        corpoTabelaInferior.appendChild(criarLinhaTabela(0, 'inferior'));
        corpoTabelaInferior.appendChild(criarLinhaTabela(1, 'inferior'));
        corpoTabelaInferior.appendChild(criarLinhaTabela(2, 'inferior'));

        const tabelaInferior = document.createElement('table');
        tabelaInferior.className = 'tabela-pontos inferior';
        tabelaInferior.appendChild(corpoTabelaInferior);

        return tabelaInferior;
    }

    var container = document.createElement('div');
    container.className = 'meia-peca superior ' + props.classe;
    var tabela = document.createElement('table');
    tabela.className = 'tabela-pontos';
    var corpoTabela = document.createElement('tbody');
    corpoTabela.appendChild(criarLinhaTabela(0, 'superior'));
    corpoTabela.appendChild(criarLinhaTabela(1, 'superior'));
    corpoTabela.appendChild(criarLinhaTabela(2, 'superior'));
    tabela.appendChild(corpoTabela);
    container.appendChild(tabela);

    var containerInferior = document.createElement('div');
    containerInferior.className = 'meia-peca inferior ' + props.classe;
    containerInferior.appendChild(criarParteInferior());

    const escolhi = document.getElementById(idPeca);

    var ladoInferior = "inferior";
    const pecaInferior = escolhi.querySelector(`.metade-${ladoInferior}`);
    pecaInferior.appendChild(containerInferior);

    var lado = "superior";
    const peca = escolhi.querySelector(`.metade-${lado}`);
    peca.appendChild(container);
}

export{MeiaPeca};