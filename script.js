// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Get saved theme from localStorage, or null if not set
    const savedTheme = localStorage.getItem('theme');
    
    // Initialize theme on page load
    if (savedTheme === 'light') {
        document.documentElement.style.colorScheme = 'light';
        themeIcon.textContent = '☀️';
    } else if (savedTheme === 'dark') {
        document.documentElement.style.colorScheme = 'dark';
        themeIcon.textContent = '🌙';
    } else {
        // If no saved theme, use system preference
        updateThemeIcon();
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentScheme = document.documentElement.style.colorScheme || 
                              (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        
        if (currentScheme === 'light') {
            document.documentElement.style.colorScheme = 'dark';
            localStorage.setItem('theme', 'dark');
            themeIcon.textContent = '🌙';
        } else {
            document.documentElement.style.colorScheme = 'light';
            localStorage.setItem('theme', 'light');
            themeIcon.textContent = '☀️';
        }
    });
    
    // Listen for system theme changes when no manual override is set
    function updateThemeIcon() {
        if (!localStorage.getItem('theme')) {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            themeIcon.textContent = isDark ? '🌙' : '☀️';
        }
    }
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeIcon);
});
