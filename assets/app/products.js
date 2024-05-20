// Importar la función necesaria desde Firebase
import { getMenuData } from "./firebase.js";

// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", async () => {
  // Mostrar el indicador de carga
    document.getElementById('loading').style.display = 'block';

  // Obtener el nombre de la colección y el índice del plato seleccionado del almacenamiento de la sesión
    const collectionName = sessionStorage.getItem('collectionName');
    const selectedPlateIndex = parseInt(sessionStorage.getItem('selectedPlate'), 10);

  // Obtener los datos de la colección de Firestore
    const data = await getMenuData(collectionName);

  // Ocultar el indicador de carga
    document.getElementById('loading').style.display = 'none';
    document.getElementById('product-container').style.display = 'flex';

  // Obtener los datos del plato seleccionado
    const selectedPlateData = data[selectedPlateIndex];

  // Llenar la información de los campos en product-description
    document.getElementById('imagen-product-p').src = selectedPlateData.url;
    document.getElementById('product-text').querySelector('h1').textContent = selectedPlateData.nombre;
    document.getElementById('product-text').querySelector('p').textContent = selectedPlateData.descripcion;
    document.getElementById('product-calo-text').textContent = selectedPlateData.calorias;
    document.getElementById('product-prote-text').textContent = selectedPlateData.proteina;
    document.getElementById('product-grasas-text').textContent = selectedPlateData.grasas;
    document.getElementById('product-carbos-text').textContent = selectedPlateData.carbos;

  // Mostrar los platos relacionados en product-related
    let suggestionIndex = 1;
    data.forEach((item, index) => {
    // Saltar el plato seleccionado
    if (index === selectedPlateIndex) return;

    let imgElement = document.getElementById(`imagen-suggestion${suggestionIndex}`);
    let nameElement = document.getElementById(`Nombre-suggestion${suggestionIndex}`);
    if (imgElement && nameElement) {
        imgElement.src = item.url;
        nameElement.textContent = item.nombre;

      // Agregar un manejador de clics al elemento h3
        nameElement.addEventListener('click', () => {
        // Guardar el identificador único del plato en el almacenamiento de la sesión
        sessionStorage.setItem('selectedPlate', index);
        // Recargar la página
        location.reload();
        });

      // Incrementar el contador solo cuando se muestra un plato relacionado
        suggestionIndex++;
    }
    });
});
