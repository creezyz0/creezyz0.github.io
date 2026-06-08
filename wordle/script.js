let word = "";
let guessedWord = [];
let attempts = 10;

const wordDisplay = document.getElementById("word-display");
const messageDisplay = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts-display");
const guessInput = document.getElementById("guess-input");

// 1. Lade die Wörter aus deiner words.txt Datei
fetch('words.txt') // Achte darauf, dass der Dateiname exakt stimmt
    .then(response => response.text())
    .then(text => {
        // Bereite die Liste vor (Leerzeilen entfernen)
        const words = text.split('\n').map(w => w.trim().toLowerCase()).filter(w => w.length > 0);
        
        // Zufälliges Wort auswählen
        word = words[Math.floor(Math.random() * words.length)];
        
        // Unterstriche generieren
        guessedWord = Array(word.length).fill("_");
        
        messageDisplay.innerText = "Spiel bereit!";
        updateDisplay();
    })
    .catch(error => {
        messageDisplay.innerText = "Fehler beim Laden der Wörter.";
    });

// Anzeige aktualisieren
function updateDisplay() {
    wordDisplay.innerText = guessedWord.join(" ");
    attemptsDisplay.innerText = `Versuche übrig: ${attempts}`;
}

// 2. Diese Funktion wird ausgeführt, wenn man auf "Raten" klickt
function makeGuess() {
    if (attempts <= 0 || !guessedWord.includes("_")) return; // Spiel ist schon vorbei

    const guess = guessInput.value.toLowerCase();
    guessInput.value = ""; // Feld wieder leeren
    guessInput.focus();

    // Eingabe prüfen
    if (guess.length !== 1 || !/^[a-zäöüß]$/i.test(guess)) {
        messageDisplay.innerText = "Bitte gib einen einzelnen Buchstaben ein.";
        return;
    }

    if (guessedWord.includes(guess)) {
        messageDisplay.innerText = "Den Buchstaben hast du schon aufgedeckt!";
        return;
    }

    // Prüfen, ob der Buchstabe im Wort ist
    if (word.includes(guess)) {
        messageDisplay.innerText = "Richtig!";
        for (let i = 0; i < word.length; i++) {
            if (word[i] === guess) {
                guessedWord[i] = guess;
            }
        }
    } else {
        attempts--;
        messageDisplay.innerText = "Falsch!";
    }

    updateDisplay();

    // Sieg oder Niederlage prüfen
    if (!guessedWord.includes("_")) {
        messageDisplay.innerText = "Gewonnen! Das Wort war: " + word;
    } else if (attempts === 0) {
        messageDisplay.innerText = "Verloren! Das Wort war: " + word;
    }
}

// Ermöglicht das Raten per Enter-Taste
guessInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        makeGuess();
    }
});