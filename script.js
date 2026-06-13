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
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
    
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

// TOGGLE ABOUT SECTION
function toggleAbout() {
    const aboutSection = document.getElementById('aboutSection');
    if (aboutSection) {
        aboutSection.classList.toggle('active');
    }
}

// TOGGLE CONNECT SECTION
function toggleConnect() {
    const connectSection = document.getElementById('connectSection');
    if (connectSection) {
        connectSection.classList.toggle('active');
    }
}

// Funktionen für das Wordle Modal
function openWordleModal() {
    const modal = document.getElementById('wordleModal');
    if (modal) {
        modal.style.display = 'flex';
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        document.body.style.overflow = 'hidden'; 
    }
}

function closeWordleModal() {
    const modal = document.getElementById('wordleModal');
    if (modal) {
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 200);
        
        document.body.style.overflow = ''; 
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('wordleModal');
    if (modal && event.target == modal) {
        closeWordleModal();
    }
}
