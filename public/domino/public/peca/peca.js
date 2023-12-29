import { distribuirPecas } from "../grid_pecas/posicionamento_pecas.js";
import { MeiaPeca } from "./numeracaoValor.js";

class PecaDomino {
    constructor(numeros, ePecaDoBaralho, status, status2, direcao) {
        this.numeros = numeros;
        this.ePecaDoBaralho = ePecaDoBaralho;
        this.status = status;
        this.status2 = status2;
        this.direcao = direcao;

        this.renderizar();
    }

    renderizar() {
        const elementoPeca = document.createElement('div');
        elementoPeca.className = `peca-domino ${this.numeros[0]}${this.numeros[1]}`;
        elementoPeca.id = `${this.numeros[0]}${this.numeros[1]}`

        const metadeSuperior = document.createElement('div');
        metadeSuperior.className = 'metade-superior';

        const metadeInferior = document.createElement('div');
        metadeInferior.className = 'metade-inferior';

        elementoPeca.appendChild(metadeSuperior);
        elementoPeca.appendChild(metadeInferior);

        this.elementoPeca = elementoPeca;
        return this.elementoPeca;
    }

    getElementoPeca() {
        return this.elementoPeca;
    }
}

function criarPecas(params) {
    for (let i = 0; i <= 6; i++) {
        for (let j = i; j <= 6; j++) {
            const pecaDomino = new PecaDomino([i, j], true, `status${i}${j}`, `status2${i}${j}`, `direcao${i}${j}`);
            document.body.appendChild(pecaDomino.getElementoPeca());
            MeiaPeca({ id: `${i}${j}`, numeroSuperior: i, numeroInferior: j });
        }
    }
    distribuirPecas();
}

export { criarPecas }