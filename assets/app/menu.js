// Importar la función necesaria desde Firebase
import { getMenuData } from "./firebase.js";

// Función para manejar los clics en los elementos del menú
function setupMenuClickHandler() {
    const menuList = document.getElementById('menu-list');
    const menuTitle = document.getElementById('menu-title').querySelector('h1');
    const loading = document.getElementById('loading').querySelector('h1');


function handleClick(event) {
    event.preventDefault();
    const menuItemText = event.target.textContent.trim();
    menuTitle.textContent = menuItemText;
    loading.textContent = "Buscando los platos mas deliciosos...";

    // Actualizar los platos del menú con los datos de la colección correspondiente
    updateMenuPlates(menuItemText.toLowerCase(),menuItemText);
    
}

    menuList.querySelectorAll('a').forEach(function(item) {
    item.addEventListener('click', handleClick);
    });
}

// Función para actualizar los platos del menú con los datos de una colección
async function updateMenuPlates(collectionName,menuItemText) {
    const data = await getMenuData(collectionName);
    const menuTitle = document.getElementById('menu-title').querySelector('h1');

  // Actualizar los platos del menú con los datos obtenidos
    data.forEach((item, index) => {
    const imgElement = document.getElementById(`imagen-plato-${index + 1}`);
    const h3Element = document.getElementById(`nombre-plato-${index + 1}`);

    if (imgElement && h3Element) {
    // Actualizar el elemento de la imagen y el texto
        imgElement.src = item.url;
        h3Element.textContent = item.nombre;
      // Agregar un manejador de clics al elemento h3
        h3Element.addEventListener('click', () => {
        // Guardar el identificador único del plato en el almacenamiento de la sesión
        sessionStorage.setItem('selectedPlate', index);
        sessionStorage.setItem('collectionName', collectionName);
        // Redirigir a product.html
        window.location.href = 'products.html';
        });
    }
});

  // Hacer visible el componente de los platos
    document.getElementById('menu-plates').style.display = 'grid';
    menuTitle.textContent = menuItemText;
    menuTitle.style.display = 'block';
    document.getElementById('loading').style.display = 'none';
}

// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", setupMenuClickHandler);