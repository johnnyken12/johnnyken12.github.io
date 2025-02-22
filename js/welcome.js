document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContent = document.getElementById('mainContent');
    const enterButton = document.getElementById('enterButton');

    // Ensure main content is blurred initially
    mainContent.classList.add('blur');

    enterButton.addEventListener('click', () => {
        // Hide welcome screen with fade out
        welcomeScreen.classList.add('hide');
        
        // Remove blur from main content
        mainContent.classList.remove('blur');
        mainContent.classList.add('show');

        // Remove welcome screen from DOM after animation
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
        }, 800);
    });
});