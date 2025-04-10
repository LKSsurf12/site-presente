let clickCount = 0; // Contador de cliques

document.getElementById("send-heart").addEventListener("click", () => {
    clickCount++;

    // Criar múltiplos corações flutuantes
    for (let i = 0; i < 5; i++) {
        createFloatingHeart();
    }

    // Se chegou a 5 cliques, envia notificação e reseta contador
    if (clickCount >= 5) {
        sendNotification();
        clickCount = 0; // Reseta o contador
    }
});

function createFloatingHeart() {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.innerHTML = "❤️";
    document.body.appendChild(heart);

    // Define posição inicial para sair do botão
    const button = document.getElementById("send-heart");
    const rect = button.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top;

    heart.style.left = `${startX}px`;
    heart.style.top = `${startY}px`;

    // Define um deslocamento aleatório para os corações não subirem todos retos
    const randomX = (Math.random() - 0.5) * 200; // Move lateralmente até 100px para cada lado
    const randomDuration = Math.random() * 2 + 3; // Duração entre 3 e 5 segundos

    heart.style.setProperty("--randomX", `${randomX}px`);
    heart.style.setProperty("--randomDuration", `${randomDuration}s`);

    setTimeout(() => {
        heart.remove();
    }, randomDuration * 1000); // Remove o coração após o tempo da animação
}

// Função para pedir permissão e enviar notificação
function sendNotification() {
    if (Notification.permission === "granted") {
        new Notification("💖 Alguém está interagindo!", {
            body: "Ela clicou no botão de coração!",
            icon: "heart-icon.png"
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                sendNotification();
            }
        });
    }
}
