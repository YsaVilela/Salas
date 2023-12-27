function verificarEncaixe(pecaMovida, pecas) {
    var encaixou = verificarColisaoComMargem(pecaMovida, pecas);

    if (encaixou) {
        // Se houver colisão, adicione a classe girada
        pecaMovida.classList.add("girada");
    } else {
        pecaMovida.classList.remove("girada");
    }
}

function verificarColisaoComMargem(pecaMovida, pecas) {
    var colidiu = false;

    // Obtém a posição da peça movida com margem
    var posicaoMovida = pecaMovida.getBoundingClientRect();

    // Verifica a colisão com outras peças
    pecas.forEach(function (outraPeca) {
        if (outraPeca !== pecaMovida && outraPeca.classList.contains("encaixavel")) {
            var posicaoOutraPeca = outraPeca.getBoundingClientRect();

            // Verificar colisão de retângulos
            if (posicaoMovida.right >= posicaoOutraPeca.left -70 &&
                posicaoMovida.left <= posicaoOutraPeca.right +70 &&
                posicaoMovida.bottom >= posicaoOutraPeca.top +8 &&
                posicaoMovida.top <= posicaoOutraPeca.bottom -8) {
                colidiu = true;
            } else if (posicaoMovida.right <= posicaoOutraPeca.left -50 &&
                posicaoMovida.left >= posicaoOutraPeca.right +50 &&
                posicaoMovida.bottom <= posicaoOutraPeca.top +8 &&
                posicaoMovida.top >= posicaoOutraPeca.bottom -8) {
                colidiu = false;
            }
        }
    });

    //console.log("Colidiu:", colidiu);

    return colidiu;
}
