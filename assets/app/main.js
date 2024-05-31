import { getMenuData } from './firebase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const recommendations = await getMenuData('recomendacion');

    // Limitar a los primeros 4 elementos
    const maxRecommendations = 4;
    for (let index = 0; index < maxRecommendations; index++) {
        const item = recommendations[index];
        const cardElement = document.getElementById(`recommendation-${index}`);
        
        if (cardElement && item) {
            const imgElement = cardElement.querySelector('.cardCover');
            const h4Element = cardElement.querySelector('.cardText h4');
            const pElement = cardElement.querySelector('.cardText p');
            const buttonElement = cardElement.querySelector('.genBtn');

            imgElement.src = item.url;
            h4Element.textContent = item.nombre;
            pElement.textContent = item.descripcion;

            buttonElement.addEventListener('click', (event) => {
                event.preventDefault();
                sessionStorage.setItem('selectedPlate', index);
                sessionStorage.setItem('collectionName', 'recomendacion');
                window.location.href = 'products.html';
            });
        }
    }
});