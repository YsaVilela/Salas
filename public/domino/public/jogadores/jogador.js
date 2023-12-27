const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const nomeJogador = params.get('nomeJogador');

const espacoJogador = document.querySelector('.primeiroJogador');
espacoJogador.querySelector('.nome').textContent = nomeJogador;