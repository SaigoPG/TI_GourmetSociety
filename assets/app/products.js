import { getMenuData } from "./firebase.js";
import { showMessage } from './mostrarMensaje.js';

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById('loading').style.display = 'block';

  const collectionName = sessionStorage.getItem('collectionName');
  const selectedPlateIndex = parseInt(sessionStorage.getItem('selectedPlate'), 10);
  const anadirButton = document.getElementById('anadir-button');

  anadirButton.addEventListener('click', function() {
    const collectionName = sessionStorage.getItem('collectionName');
    const selectedPlateIndex = parseInt(sessionStorage.getItem('selectedPlate'), 10);
  
    if (collectionName && selectedPlateIndex >= 0) {
      let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

      // Buscar el producto en el carrito
      let productoExistente = carrito.find(item => item.collectionName === collectionName && item.selectedPlateIndex === selectedPlateIndex);

      if (productoExistente) {
        // Incrementar la cantidad del producto existente
        productoExistente.quantity += 1;
        showMessage(`Se ha añadido ${productoExistente.quantity} al carrito`);
      } else {
        // Agregar un nuevo producto al carrito con cantidad 1
        carrito.push({ collectionName, selectedPlateIndex, quantity: 1 });
        showMessage("El plato se ha añadido al carrito");
      }
  
      sessionStorage.setItem('carrito', JSON.stringify(carrito));
    } else {
      console.error('No se encontraron datos del producto en sessionStorage');
    }
  });

  const data = await getMenuData(collectionName);
  document.getElementById('loading').style.display = 'none';
  document.getElementById('product-container').style.display = 'flex';

  const selectedPlateData = data[selectedPlateIndex];
  document.getElementById('imagen-product-p').src = selectedPlateData.url;
  document.getElementById('product-text').querySelector('h1').textContent = selectedPlateData.nombre;
  document.getElementById('product-content').textContent = selectedPlateData.descripcion;
  document.getElementById('price').textContent = "$" + selectedPlateData.precio;
  document.getElementById('product-calo-text').textContent = selectedPlateData.calorias;
  document.getElementById('product-prote-text').textContent = selectedPlateData.proteina;
  document.getElementById('product-grasas-text').textContent = selectedPlateData.grasas;
  document.getElementById('product-carbos-text').textContent = selectedPlateData.carbos;

  let suggestionIndex = 1;
  data.forEach((item, index) => {
    if (index === selectedPlateIndex) return;

    let imgElement = document.getElementById(`imagen-suggestion${suggestionIndex}`);
    let nameElement = document.getElementById(`Nombre-suggestion${suggestionIndex}`);
    if (imgElement && nameElement) {
      imgElement.src = item.url;
      nameElement.textContent = item.nombre;

      nameElement.addEventListener('click', () => {
        sessionStorage.setItem('selectedPlate', index);
        location.reload();
      });

      suggestionIndex++;
    }
  });
});