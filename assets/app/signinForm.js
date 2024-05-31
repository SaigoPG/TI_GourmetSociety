import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js"
import { auth } from './firebase.js'
import { showMessage } from './mostrarMensaje.js'


const signInForm = document.querySelector('#regForm')
signInForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = signInForm['nUsuario'].value;
    const password = signInForm['nPass'].value;
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredentials)
        window.location.href = 'index.html';
    } catch (error) {
        //console.log(error)
        if (error.code === 'auth/wrong-password') {
            showMessage("Contraseña incorrecta. ", "error");
        }
        else if (error.code === 'auth/user-not-found') {
            showMessage("El usuario no esta registrado. ", "error");
        }
        else if (error.code) {
            showMessage("Credenciales no validas. ", "error");
        }
    }
})
