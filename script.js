document.addEventListener("DOMContentLoaded", function() {
    // Aguarde um breve momento antes de iniciar a animação
    setTimeout(function() {
        var whiteBox = document.querySelector('.white-box');
        
        // Animação de aparecimento
        whiteBox.style.opacity = '1';
        whiteBox.style.transform = 'scale(1)';
        
        // Aguarde mais um momento antes de esconder a animação
        setTimeout(function() {
            setTimeout(function() {
                whiteBox.style.opacity = '0';
                whiteBox.style.transform = 'scale(0.1)';
                
            },1000);
            setTimeout(function() {
var abertura = document.querySelector('abertura');
                abertura.style.opacity = '0';
 },1000);
            document.getElementById('abertura').style.display = 'none';
        }, 2000); // Ajuste conforme necessário
    }, 1000); // Ajuste conforme necessário
});
