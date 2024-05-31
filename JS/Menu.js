const plates = document.querySelectorAll('.plate');

plates.forEach(plate => {
    plate.addEventListener('mouseover', () => {
        anime({
            targets: plate,
            scale: 1.05,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            duration: 300,
            easing: 'easeInOutQuad'
        });
    });

    plate.addEventListener('mouseout', () => {
        anime({
            targets: plate,
            scale: 1,
            boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
            duration: 300,
            easing: 'easeInOutQuad'
        });
    });
});