import { createUserWithEmailAndPassword, updateProfile} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js"
import { auth, saveUser } from './firebase.js'
import { showMessage } from './mostrarMensaje.js'


const signupForm = document.querySelector('#regForm')

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = signupForm['nMail'].value
    const username = signupForm['nUsuario'].value
    const password = signupForm['nPass'].value


    //console.log(email, username, password);

    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const id = ("User ID: ", userCredentials.user.uid);
        await updateProfile(userCredentials.user, {displayName: username});  
        await saveUser(id,username);
        window.location.href = 'index.html';
    } catch (error) {
        //console.log(error.message)
        //console.log(error.code)
        if (error.code === 'auth/email-already-in-use') {
            showMessage("El correo ya esta en uso. ", "error");
        }
        else if (error.code === 'auth/invalid-email') {
            showMessage("Correo invalido. ", "error");
        }
        else if (error.code === 'auth/weak-password') {
            showMessage("La contraseña es muy debil, debe tener almenos 6 caracteres. ", "error");
        }
        else if (error.code === 'auth/missing-password') {
            showMessage("Escriba una contraseña. ", "error");
        }
        else if (error.code) {
            showMessage("Algo no fue como se esperaba. ", "error");
        }
    }

})