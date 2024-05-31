import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js"
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js"
import { auth } from './firebase.js'
import { showMessage } from './mostrarMensaje.js'




onAuthStateChanged(auth, async (user) => {
    if (user) {
        showMessage("Bienvenido " + user.displayName);
    }
});


