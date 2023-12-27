document.addEventListener("DOMContentLoaded", function () {
    var pecas = document.querySelectorAll(".peca-mock");
    var pecaSelecionada = null;
    var pecaInicialPos = { left: 0, top: 0 }; // Armazena a posição inicial da peça

    pecas.forEach(function (peca) {
        peca.addEventListener("mousedown", function (event) {
            event.preventDefault();


            pecaSelecionada = peca;
            pecaInicialPos = peca.getBoundingClientRect();

            var offsetX = event.clientX - pecaInicialPos.left;
            var offsetY = event.clientY - pecaInicialPos.top;

            function movePeca(event) {
                if (pecaSelecionada && !pecaSelecionada.classList.contains("fixa") && !pecaSelecionada.classList.contains("encaixavel")) {
              
                  if (pecaSelecionada.style.position !== "absolute") {
                    pecaSelecionada.style.position = "absolute";
                  }
              
                  divDoTabuleiro = document.querySelector(".tabuleiro");
                  // Nova posição da peça em porcentagem
                  let novaPosicaoLeft = (event.clientX - offsetX) / divDoTabuleiro.clientWidth * 70;
                  let novaPosicaoTop = (event.clientY - offsetY) / divDoTabuleiro.clientHeight * 69;
              
                  // Limites da div que contém o tabuleiro (em porcentagem)
                  let limiteEsquerdo = 15;
                  let limiteSuperior = 15;
                  let limiteDireito = 86 - (pecaSelecionada.clientWidth / divDoTabuleiro.clientWidth * 100);
                  let limiteInferior = 89 - (pecaSelecionada.clientHeight / divDoTabuleiro.clientHeight * 100);
              
                  // Garante que a posição da peça não ultrapasse os limites
                  novaPosicaoLeft = Math.max(limiteEsquerdo, Math.min(novaPosicaoLeft, limiteDireito));
                  novaPosicaoTop = Math.max(limiteSuperior, Math.min(novaPosicaoTop, limiteInferior));
              
                //   pecaSelecionada.style.left = novaPosicaoLeft + "%";
                //   pecaSelecionada.style.top = novaPosicaoTop + "%";
              
                  verificarEncaixe(pecaSelecionada, pecas);

                


                  if (!colidiu && !pecaSelecionada.classList.contains("fixar")) {

                    pecaSelecionada.style.left = novaPosicaoLeft + "%";
                    pecaSelecionada.style.top = novaPosicaoTop + "%";
                
                }
                  
                    if (pecaSelecionada.classList.contains("girada") && colidiu === true) {                            
                            pecaSelecionada.classList.add("fixa");
                    }               
                  // Verifique a colisão enquanto move
                }
            }
              
             

            document.addEventListener("mousemove", movePeca);

            document.addEventListener("mouseup", function () {
                console.log("Peça solta:", pecaSelecionada.textContent);

                if (verificarColisao(pecaSelecionada)) {
                    if (pecaSelecionada.classList.contains("girada")) {
                      pecaSelecionada.classList.add("fixa");
                    } else  {

                        let limiteInferior = 89 - (pecaSelecionada.clientHeight / divDoTabuleiro.clientHeight * 100);

                        pecaSelecionada.style.left = 50 + "%";
                        pecaSelecionada.style.top = limiteInferior*0.95 + "%";
                        colidiu = false;
                    }
                }

                let posicaoFixacao = verificarFixacao(pecaSelecionada, pecas)
                if (pecaSelecionada.classList.contains("fixar")) {

                    let pecaDupla = posicaoFixacao[3];
                    
                    if (pecaDupla) {
                        console.log("ccccccccccccccccccccccccc");
                        let PosicaoParaFixacaoTop = (posicaoFixacao[0] - pecaSelecionada.clientWidth/4.1) / divDoTabuleiro.clientHeight * 69;
                        if (posicaoFixacao[2] == "esquerda") {
                            let PosicaoParaFixacaoLeft = (posicaoFixacao[1] - pecaSelecionada.clientHeight*0.81) / divDoTabuleiro.clientWidth * 70;
                            pecaSelecionada.style.top = PosicaoParaFixacaoTop + "%";
                            pecaSelecionada.style.left = PosicaoParaFixacaoLeft + "%";
                            pecaSelecionada.classList.add("encaixavel");  
                        } else if (posicaoFixacao[2] == "direita") {
                            let PosicaoParaFixacaoRight = (posicaoFixacao[1] + pecaSelecionada.clientHeight*0.85 - 15) / divDoTabuleiro.clientWidth * 70;
                            pecaSelecionada.style.top = PosicaoParaFixacaoTop + "%";
                            pecaSelecionada.style.left = PosicaoParaFixacaoRight + "%"; 
                            pecaSelecionada.classList.add("encaixavel");
                        }
                    } else { //desenvolvimento

                        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                        let PosicaoParaFixacaoTop = (posicaoFixacao[0] - pecaSelecionada.clientWidth/1.1) / divDoTabuleiro.clientHeight * 69;
                        if (posicaoFixacao[2] == "esquerda") {
                            let PosicaoParaFixacaoLeft = (posicaoFixacao[1] - pecaSelecionada.clientHeight*0.81) / divDoTabuleiro.clientWidth * 70;
                            pecaSelecionada.style.top = PosicaoParaFixacaoTop + "%";
                            pecaSelecionada.style.left = PosicaoParaFixacaoLeft + "%";
                            pecaSelecionada.classList.add("encaixavel");  
                        } else if (posicaoFixacao[2] == "direita") {
                            let PosicaoParaFixacaoRight = (posicaoFixacao[1] + pecaSelecionada.clientHeight - 15) / divDoTabuleiro.clientWidth * 74;
                            pecaSelecionada.style.top = PosicaoParaFixacaoTop + "%";
                            pecaSelecionada.style.left = PosicaoParaFixacaoRight + "%"; 
                            pecaSelecionada.classList.add("encaixavel");
                        }
                    }

                }

                document.removeEventListener("mousemove", movePeca);
                document.removeEventListener("mouseup", arguments.callee);
                pecaSelecionada = null;
            });
        });
    });

    var tabuleiro = document.querySelector(".tabuleiro");

    tabuleiro.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    tabuleiro.addEventListener("drop", function (event) {
        event.preventDefault();

        if (pecaSelecionada) {
            var novaPeca = pecaSelecionada.cloneNode(true);
            novaPeca.style.position = "static";
            tabuleiro.appendChild(novaPeca);

            pecaSelecionada = null;
        }
    });

    let colidiu = false;
    function verificarColisao(pecaMovida) {
      
        // Obtém a posição da peça movida
        var posicaoMovida = pecaMovida.getBoundingClientRect();
      
        // Verifica a colisão com outras peças
        pecas.forEach(function (outraPeca) {
          if (outraPeca !== pecaMovida) {
            var posicaoOutraPeca = outraPeca.getBoundingClientRect();

            // Verificar colisão de retângulos sem margem e sem considerar "encaixável"
            if (
              posicaoMovida.right >= posicaoOutraPeca.left &&
              posicaoMovida.left <= posicaoOutraPeca.right &&
              posicaoMovida.bottom >= posicaoOutraPeca.top &&
              posicaoMovida.top <= posicaoOutraPeca.bottom
            ) {
              colidiu = true;

            }
          }
        });
      
      
        return colidiu;
      }
      
      
});
