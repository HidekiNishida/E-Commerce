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