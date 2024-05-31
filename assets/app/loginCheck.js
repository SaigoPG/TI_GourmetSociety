import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js"
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js"
import { auth } from './firebase.js'
import { showMessage } from './mostrarMensaje.js'


const logout = document.querySelector('#logout');
const loginButton = document.querySelector('#loginButton');

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        // Usuario no está autenticado
        logout.style.display = 'none';
        loginButton.style.display = 'block';
        sessionStorage.setItem('isLoggedIn', 'false'); // Guardar estado de autenticación en sessionStorage
    } else {
        // Usuario está autenticado
        logout.style.color = 'white';
        logout.style.display = 'block';
        loginButton.style.display = 'none';
        sessionStorage.setItem('isLoggedIn', 'true'); // Guardar estado de autenticación en sessionStorage
    }
});

//logout
logout.addEventListener('click', async () => {
    await signOut(auth);
    showMessage("Has cerrado sesion");
    //console.log('signout')
})



