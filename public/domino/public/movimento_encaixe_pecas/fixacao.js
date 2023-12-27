function verificarFixacao(pecaMovida, pecas) {

    verificarColisaoComMargemParaEncaixeAtomatico(pecaMovida, pecas);

    if (vaiFixar) {
        // Se houver colisão, adicione a classe girada
        pecaMovida.classList.add("fixar");
        if(ladoDeAproximacao == "esquerda"){
            return [pecaMovidaAltura, pecaMovidaLado, ladoDeAproximacao, tipoPeca];
        } else if (ladoDeAproximacao == "direita") {
            return [pecaMovidaAltura, pecaMovidaLado, ladoDeAproximacao, tipoPeca];
        }
        
    } else {
        pecaMovida.classList.remove("teste-fixar");
    }
}

let pecaMovidaAltura;
let pecaMovidaLado;

let ladoDeAproximacao;
let tipoPeca

let vaiFixar = false;
function verificarColisaoComMargemParaEncaixeAtomatico(pecaMovida, pecas) {

    // Obtém a posição da peça movida com margem
    var posicaoMovida = pecaMovida.getBoundingClientRect();

    // Verifica a colisão com outras peças
    pecas.forEach(function (outraPeca) {

        
        
        if (outraPeca !== pecaMovida && outraPeca.classList.contains("encaixavel")) {
            var posicaoOutraPeca = outraPeca.getBoundingClientRect();        
            // Verificar colisão de retângulos


            tipoPeca = outraPeca.classList.contains("ponta");


            if (posicaoMovida.right >= posicaoOutraPeca.left -15 &&
                posicaoMovida.left <= posicaoOutraPeca.right +15 &&
                posicaoMovida.bottom >= posicaoOutraPeca.top +8 &&
                posicaoMovida.top <= posicaoOutraPeca.bottom -8) {
                
                    vaiFixar = true;


                    // Verifica se a aproximação é pela esquerda ou pela direita
                pecaMovidaAltura = posicaoOutraPeca.top;
                if (posicaoMovida.left <= posicaoOutraPeca.left) {
                    // Aproximação pela esquerda
                    ladoDeAproximacao = "esquerda";
                    pecaMovidaLado = posicaoOutraPeca.left;



                    outraPeca.classList.add("esquerda")
                    if (outraPeca.classList.contains("ponta") && outraPeca.classList.contains("esquerda") && outraPeca.classList.contains("direita")) {
                        outraPeca.classList.remove("encaixavel")
                    }     
                             
                } else if (!outraPeca.classList.contains("direita")) {
                    // Aproximação pela direita
                    ladoDeAproximacao = "direita";
                    pecaMovidaLado = posicaoOutraPeca.left; 



                    outraPeca.classList.add("direita"); 
                    if (outraPeca.classList.contains("ponta") && outraPeca.classList.contains("esquerda") && outraPeca.classList.contains("direita")) {
                        outraPeca.classList.remove("encaixavel")
                    }
                    if (!outraPeca.classList.contains("ponta") && (outraPeca.classList.contains("esquerda") || outraPeca.classList.contains("direita"))) {
                        outraPeca.classList.remove("encaixavel");
                    }  
                }







                    //pecaNaPonta = document.querySelector(".ponta");

            } else if (posicaoMovida.right <= posicaoOutraPeca.left -50 &&
                posicaoMovida.left >= posicaoOutraPeca.right +50 &&
                posicaoMovida.bottom <= posicaoOutraPeca.top +8 &&
                posicaoMovida.top >= posicaoOutraPeca.bottom -8) {
                
                    vaiFixar = false;
            }
        }
    });

    //console.log("Colidiu:", colidiu);

    return vaiFixar;
}
