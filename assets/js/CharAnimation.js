// Seleciona todos os elementos com a classe "animated-text"
const todosElementos = document.querySelectorAll(".animated-text");

// Verifica se há pelo menos um elemento
if (todosElementos.length > 0) {
  // Executa o script para cada elemento encontrado
  todosElementos.forEach((elemento) => {
    const elementoTexto = elemento,
      listaPalavras = elementoTexto.getAttribute("data-words"),
      palavras = listaPalavras.split(", "); // Cria um array de palavras a partir do atributo de dados

    let contadorPalavras = 0;

    iniciar();

    // Função inicial
    function iniciar() {
      if (contadorPalavras < palavras.length) {
        // Executa o código para cada palavra
        let palavra = palavras[contadorPalavras],
          arrTexto = palavra.split(""), // Cria um array de letras na palavra
          contador = 0;

        elementoTexto.textContent = ""; // Remove o texto anterior do elemento

        // Para cada letra no array
        arrTexto.forEach((letra) => {
          // Substitui o espaço vazio pelo HTML "non-break-space"...
          // ... Isso é necessário para separar corretamente as palavras
          let _letra = letra === " " ? "&nbsp;" : letra;

          // Envolve cada letra com uma tag "span" e as coloca de volta no elemento
          elementoTexto.innerHTML += `<span>${_letra}</span>`;
        });

        let spans = elementoTexto.childNodes;

        // Define o intervalo entre cada letra sendo exibida
        const intervaloLetra = setInterval(letraAtiva, 70);

        function letraAtiva() {
          spans[contador].classList.add("active");
          contador++;

          if (contador === spans.length) {
            clearInterval(intervaloLetra);

            // Aguarda 4 segundos para começar a apagar a palavra
            setTimeout(() => {
              apagarTexto();
            }, 600);
          }
        }

        function apagarTexto() {
          // Define o intervalo entre cada letra sendo ocultada
          let intervaloRemocao = setInterval(removerLetra, 40);
          contador--;

          function removerLetra() {
            spans[contador].classList.remove("active");
            contador--;

            if (contador === -1) {
              clearInterval(intervaloRemocao);
              contadorPalavras++;

              // Após remover a última letra, chama a função inicial novamente
              iniciar();
            }
          }
        }
      } else {
        // Se o código alcançar a última palavra
        // Reinicia o contador de palavras...
        contadorPalavras = 0;
        // ...e chama a função inicial novamente.
        iniciar();
      }
    }
  });
}
