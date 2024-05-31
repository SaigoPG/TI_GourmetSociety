const Boxes = document.querySelectorAll('.box');

function handleMouseOver() {
    this.style.transform = 'scale(1.05)';
    this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
}

function handleMouseOut() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = 'none';
}

Boxes.forEach(box => {
    box.addEventListener('mouseover', handleMouseOver);
    box.addEventListener('mouseout', handleMouseOut);
});