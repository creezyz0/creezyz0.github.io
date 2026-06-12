// Appwrite Initialisierung via CDN
const { Client, Account, Databases } = Appwrite;

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("6a2c479b0029c79209c6");

const account = new Account(client);
const databases = new Databases(client);

// Ping-Funktion zur Verifizierung
client.ping().then(() => {
    console.log("Appwrite Verbindung: Aktiv und bereit.");
}).catch((error) => {
    console.error("Appwrite Verbindung fehlgeschlagen:", error);
});

// Theme Toggle Code
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    const savedTheme = localStorage.getItem('theme');
    let initialTheme;
    
    if (savedTheme) {
        initialTheme = savedTheme;
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        initialTheme = prefersDark ? 'dark' : 'light';
    }
    
    setTheme(initialTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
    function setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'light') {
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
    }
});

// Funktionen für das Wordle Modal
function openWordleModal() {
    const modal = document.getElementById('wordleModal');
    modal.style.display = 'flex';
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    document.body.style.overflow = 'hidden'; 
}

function closeWordleModal() {
    const modal = document.getElementById('wordleModal');
    modal.classList.remove('active');
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 200);
    
    document.body.style.overflow = ''; 
}

window.onclick = function(event) {
    const modal = document.getElementById('wordleModal');
    if (event.target == modal) {
        closeWordleModal();
    }
}