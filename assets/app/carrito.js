import './acompanamiento.js';
import { getPlateData } from './firebase.js';
import { showMessage } from './mostrarMensaje.js'

document.addEventListener('DOMContentLoaded', function() {
  renderCarrito(); // Llama a la función de renderizado al cargar la página
  // Selecciona el botón con la clase 'btn_pagar'
const pagarButton = document.querySelector('.btn_pagar');

// Añade un evento de clic al botón
pagarButton.addEventListener('click', () => {
    // Obtiene el estado de autenticación del sessionStorage
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    // Verifica si el usuario está logeado
    if (isLoggedIn === 'true') {
        // El usuario está logeado, no hacer nada
    } else {
        // El usuario no está logeado, mostrar mensaje en la consola
        showMessage('Para pedir hay que estar logeado');
    }
});
});

// Función para renderizar el carrito
export async function renderCarrito() {
  const platosBox = document.getElementById('platosBox');

  // Obtener el carrito del sessionStorage
  const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

  // Seleccionar o crear el contenedor de platos
  let platosContainer = document.getElementById('platosContainer');
  if (!platosContainer) {
    platosContainer = document.createElement('div');
    platosContainer.id = 'platosContainer';
    platosBox.appendChild(platosContainer);
  }

  // Limpiar el contenedor de platos antes de renderizar
  platosContainer.innerHTML = '';

  // Verificar si el carrito está vacío
  if (carrito.length === 0) {
    platosContainer.innerHTML = '<p>No hay platos en el carrito.</p>';
    return;
  }

  // Función para renderizar un plato en el DOM
  async function renderPlate(item, index) {
    const { collectionName, selectedPlateIndex, quantity = 1 } = item;

    // Obtener los datos del plato desde Firebase
    const selectedPlateData = await getPlateData(collectionName, selectedPlateIndex);

    // Crear el HTML para el plato
    const foodInfoDiv = document.createElement('div');
    foodInfoDiv.classList.add('food_Info');
    foodInfoDiv.dataset.index = index;

    foodInfoDiv.innerHTML = `
      <div class="food_Info_Img">
        <img src="${selectedPlateData.url}" alt="Imagen">
      </div>
      <div class="food_Info_Txt">
        <div class="food_Info_nombre">
          <h3>${selectedPlateData.nombre}</h3>
          <h4>$${selectedPlateData.precio}</h4>
        </div>
        <div class="food_Info_Cantidad">
          <div class="boton_Cantidad">
            <span class="material-symbols-outlined boton-menos" style="cursor: pointer;">do_not_disturb_on</span>
            <p class="cantidad">${quantity}</p>
            <span class="material-symbols-outlined boton-mas" style="cursor: pointer;">add_circle</span>
          </div>
          <h5>Cantidad</h5>
        </div>
        <div class="eliminar-plato">
          <span class="material-symbols-outlined boton-eliminar" style="cursor: pointer;">close</span>
        </div>
      </div>
    `;

    // Agregar el plato al contenedor de platos
    platosContainer.appendChild(foodInfoDiv);

    // Event listeners para botones de cantidad
    const botonMenos = foodInfoDiv.querySelector('.boton-menos');
    const botonMas = foodInfoDiv.querySelector('.boton-mas');
    const botonEliminar = foodInfoDiv.querySelector('.boton-eliminar');

    botonMenos.addEventListener('click', () => updateQuantity(index, -1));
    botonMas.addEventListener('click', () => updateQuantity(index, 1));
    botonEliminar.addEventListener('click', () => removePlate(index));
  }

  // Función para actualizar la cantidad
  function updateQuantity(index, change) {
    const item = carrito[index];
    item.quantity = (item.quantity || 1) + change;

    // Actualizar o eliminar el plato según la nueva cantidad
    if (item.quantity <= 0) {
      removePlate(index);
    } else {
      const plateElement = document.querySelector(`.food_Info[data-index="${index}"] .cantidad`);
      if (plateElement) plateElement.textContent = item.quantity;
    }

    // Actualizar el carrito en sessionStorage
    sessionStorage.setItem('carrito', JSON.stringify(carrito));

    // Recargar los índices de los platos en el DOM y reasignar los event listeners
    document.querySelectorAll('.food_Info').forEach((div, newIndex) => {
      div.dataset.index = newIndex;

      // Reasignar event listeners para actualizar la cantidad
      const botonMenos = div.querySelector('.boton-menos');
      const botonMas = div.querySelector('.boton-mas');
      const botonEliminar = div.querySelector('.boton-eliminar');

      if (botonMenos && botonMas && botonEliminar) {
        // Eliminar los event listeners existentes para evitar múltiples registros
        const newBotonMenos = botonMenos.cloneNode(true);
        const newBotonMas = botonMas.cloneNode(true);
        const newBotonEliminar = botonEliminar.cloneNode(true);

        botonMenos.parentNode.replaceChild(newBotonMenos, botonMenos);
        botonMas.parentNode.replaceChild(newBotonMas, botonMas);
        botonEliminar.parentNode.replaceChild(newBotonEliminar, botonEliminar);

        newBotonMenos.addEventListener('click', () => updateQuantity(newIndex, -1));
        newBotonMas.addEventListener('click', () => updateQuantity(newIndex, 1));
        newBotonEliminar.addEventListener('click', () => removePlate(newIndex));
      }
    });
  }

  // Función para eliminar un plato del carrito
  function removePlate(index) {
    carrito.splice(index, 1);
    const plateElement = document.querySelector(`.food_Info[data-index="${index}"]`);
    if (plateElement) plateElement.remove();

    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
      platosContainer.innerHTML = '<p>No hay platos en el carrito.</p>';
    }

    // Actualizar el carrito en sessionStorage
    sessionStorage.setItem('carrito', JSON.stringify(carrito));

    // Recargar los índices de los platos en el DOM y reasignar los event listeners
    document.querySelectorAll('.food_Info').forEach((div, newIndex) => {
      div.dataset.index = newIndex;

      // Reasignar event listeners para actualizar la cantidad
      const botonMenos = div.querySelector('.boton-menos');
      const botonMas = div.querySelector('.boton-mas');
      const botonEliminar = div.querySelector('.boton-eliminar');

      if (botonMenos && botonMas && botonEliminar) {
        // Eliminar los event listeners existentes para evitar múltiples registros
        const newBotonMenos = botonMenos.cloneNode(true);
        const newBotonMas = botonMas.cloneNode(true);
        const newBotonEliminar = botonEliminar.cloneNode(true);

        botonMenos.parentNode.replaceChild(newBotonMenos, botonMenos);
        botonMas.parentNode.replaceChild(newBotonMas, botonMas);
        botonEliminar.parentNode.replaceChild(newBotonEliminar, botonEliminar);

        newBotonMenos.addEventListener('click', () => updateQuantity(newIndex, -1));
        newBotonMas.addEventListener('click', () => updateQuantity(newIndex, 1));
        newBotonEliminar.addEventListener('click', () => removePlate(newIndex));
      }
    });
  }

  // Renderizar todos los platos en el carrito
  for (let i = 0; i < carrito.length; i++) {
    renderPlate(carrito[i], i);
  }


}
