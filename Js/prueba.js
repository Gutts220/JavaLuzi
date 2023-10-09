document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.getElementById("game-container");
    const backgroundImg = document.getElementById("background-image");
    const objectImages = document.getElementById("object-images");
    const descriptionText = document.getElementById("description-text");
    const actionButtons = document.getElementById("action-buttons");

    let gameState = {
        currentScene: 0,
        backgroundImages: ["images/background1.jpg", "images/background2.jpg", "images/background3.jpg"],
        objectImages: ["images/object1.jpg", "images/object2.jpg", "images/object3.jpg"],
        descriptions: ["Descripción 1", "Descripción 2", "Descripción 3"],
        buttonTexts: ["Opción 1", "Opción 2", "Opción 3"],
    };

    function updateGameScreen() {
        backgroundImg.innerHTML = `<img src="${gameState.backgroundImages[gameState.currentScene]}" alt="Background Image">`;

        // Mostrar imágenes de objetos
        objectImages.innerHTML = "";
        for (let i = 0; i < gameState.objectImages.length; i++) {
            objectImages.innerHTML += `<img src="${gameState.objectImages[i]}" alt="Object ${i + 1}">`;
        }

        // Mostrar texto descriptivo
        descriptionText.textContent = gameState.descriptions[gameState.currentScene];

        // Mostrar botones de acción
        actionButtons.innerHTML = "";
        for (let i = 0; i < gameState.buttonTexts.length; i++) {
            const button = document.createElement("button");
            button.textContent = gameState.buttonTexts[i];
            button.addEventListener("click", () => {
                // Define las acciones que ocurren cuando se hace clic en los botones
                // Aquí puedes actualizar el estado del juego y llamar a updateGameScreen() nuevamente.
                // Por ejemplo, cambia gameState.currentScene para avanzar en la historia.
                if (gameState.currentScene < gameState.backgroundImages.length - 1) {
                    gameState.currentScene++;
                    updateGameScreen();
                } else {
                    // Has llegado al final del juego, puedes mostrar un mensaje de victoria aquí.
                    alert("¡Has ganado!");
                }
            });
            actionButtons.appendChild(button);
        }
    }

    // Iniciar el juego
    updateGameScreen();
});