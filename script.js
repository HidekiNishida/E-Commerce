document.addEventListener("DOMContentLoaded", function() {
    // Aguarde um breve momento antes de iniciar a animação
    setTimeout(function() {
        var whiteBox = document.querySelector('.white-box');
        var nomeContainer = document.getElementById('nome-container');
        
        // Animação de aparecimento
        whiteBox.style.opacity = '1';
        whiteBox.style.transform = 'scale(1)';
        
        setTimeout(function() {
            animateText("Hideki Nishida", nomeContainer, 100); // Ajuste conforme necessário
        }, 2000); // Ajuste conforme necessáriox
        
        
        // Aguarde mais um momento antes de esconder a animação
        setTimeout(function() {
            setTimeout(function() {
                whiteBox.style.opacity = '0';
                whiteBox.style.transform = 'scale(0.1)';
                nomeContainer.style.opacity = '0';
               
                    
                    setTimeout(function() {
                        var abertura = document.getElementById('abertura');
                                        abertura.style.opacity = '0';
                                        setTimeout(function() {
                                            aberturaContainer.style.display = 'none';
                                            whiteBox.remove();
                                            nomeContainer.remove();
                                        },1000);

                                        

                                        
                         },1000);
                   
                
            },2000);
           
            
        }, 3000); // Ajuste conforme necessário
    }, 1000); // Ajuste conforme necessário
});


// Função para animar texto letra por letra
function animateText(texto, container, delay) {
    for (var i = 0; i < texto.length; i++) {
        setTimeout(function(index) {
            container.innerText += texto[index];
        }, i * delay, i);
    }
    // Adicione o texto entre "<>"
    setTimeout(function() {
        container.innerHTML = "&lt;" + texto + "&gt;";
    }, texto.length * delay);
}


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
