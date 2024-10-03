let scrolling = true;

function checkVisibility() {
    if (document.hidden) {
        scrolling = false;
        document.getElementById('scrollText').style.animationPlayState = 'paused';
    } else {
        scrolling = true;
        document.getElementById('scrollText').style.animationPlayState = 'running';
    }
}

// Verifica a visibilidade da aba
document.addEventListener('visibilitychange', checkVisibility);

// Inicia a verificação ao carregar a página
checkVisibility();