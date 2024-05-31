 document.addEventListener('DOMContentLoaded', function() {
    
    const fullImage = document.querySelector('.fullImage');
    const overlayH1 = document.querySelector('.overlay h1');
    const overlayP = document.querySelector('.overlay p');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Función para manejar el desplazamiento
    function handleScroll() {
        if (isElementInViewport(fullImage)) {
            overlayH1.style.transform = 'translateX(300%)';
            overlayP.style.transform = 'translateX(300%)';
            window.removeEventListener('scroll', handleScroll);
        }
    }

    window.addEventListener('scroll', handleScroll);
});