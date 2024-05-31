import { getMenuData } from "./firebase.js";
import { showMessage } from './mostrarMensaje.js';
import { renderCarrito } from './carrito.js';

document.addEventListener("DOMContentLoaded", async () => {
const adicionesBox = document.getElementById('adicionesBox');
const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

  // Obtener los datos de la colección de Firestore
const acompanamientosData = await getMenuData('acompanamientos');

  // Renderizar las adiciones
acompanamientosData.forEach((item, index) => {
    renderAddition(item, index);
});

function renderAddition(item, index) {
    const foodInfoDiv = document.createElement('div');
    foodInfoDiv.classList.add('food_Info');
    foodInfoDiv.dataset.index = index;

    foodInfoDiv.innerHTML = `
        <div class="food_Info_Img">
        <img src="${item.url}" alt="Imagen">
        </div>
        <div class="food_Info_Txt">
        <div class="food_Info_nombre">
            <h3>${item.nombre}</h3>
            <h4>$${item.precio}</h4>
        </div>
        <div class="food_Info_Cantidad">
            <div class="boton_Cantidad">
            <span class="material-symbols-outlined boton-menos">do_not_disturb_on</span>
            <p class="cantidad">1</p>
            <span class="material-symbols-outlined boton-mas">add_circle</span>
            </div>
            <h5>Cantidad</h5>
        </div>
        <div>
            <button class="anadir-button">Añadir</button>
        </div>
    </div>
    `;

    // Agregar el plato al contenedor de adiciones
    adicionesBox.appendChild(foodInfoDiv);

    // Event listeners para botones de cantidad
    const botonMenos = foodInfoDiv.querySelector('.boton-menos');
    const botonMas = foodInfoDiv.querySelector('.boton-mas');
    const cantidadElement = foodInfoDiv.querySelector('.cantidad');
    let cantidad = 1;

    botonMenos.addEventListener('click', () => {
    if (cantidad > 1) {
        cantidad--;
        cantidadElement.textContent = cantidad;
    }
    });

    botonMas.addEventListener('click', () => {
        cantidad++;
        cantidadElement.textContent = cantidad;
    });

    // Event listener para el botón Añadir
    const anadirButton = foodInfoDiv.querySelector('.anadir-button');
    anadirButton.addEventListener('click', () => {
    const itemToAdd = { 
        collectionName: 'acompanamientos', 
        selectedPlateIndex: index,
        quantity: cantidad
    };

      // Verificar si el producto ya está en el carrito
    const existingItemIndex = carrito.findIndex(
        cartItem => cartItem.collectionName === itemToAdd.collectionName && cartItem.selectedPlateIndex === itemToAdd.selectedPlateIndex
    );

    if (existingItemIndex >= 0) {
        // Incrementar la cantidad del producto existente
        carrito[existingItemIndex].quantity += cantidad;
    } else {
        // Añadir el nuevo producto al carrito
        carrito.push(itemToAdd);
    }

      // Actualizar el carrito en sessionStorage
    sessionStorage.setItem('carrito', JSON.stringify(carrito));

      // Mostrar mensaje
    showMessage(`Se ha añadido ${cantidad} al carrito`);

      // Renderizar el carrito actualizado
    renderCarrito();
    });
    }
});
