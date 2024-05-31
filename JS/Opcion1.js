document.addEventListener('DOMContentLoaded', function() {
    const registerBox = document.querySelector('.registerBox');
    const loginBox = document.querySelector('.loginBox');

    // Add the show class after a short delay
    setTimeout(() => {
        if (registerBox) {
            registerBox.classList.add('show');
        }
        if (loginBox) {
            loginBox.classList.add('show');
        }
    }, 100);
});