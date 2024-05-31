// Importando Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
// Importando firestore
import { 
  query,
  getFirestore,
  collectionGroup,
  collection,
  setDoc,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  where,
  updateDoc,} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
  // Importando storage
  import { getStorage,getDownloadURL,uploadBytes, ref} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgefBvapVqPpMff6v7GqoXwUIjDuj83ak",
  authDomain: "gourmet-society-12b9c.firebaseapp.com",
  projectId: "gourmet-society-12b9c",
  storageBucket: "gourmet-society-12b9c.appspot.com",
  messagingSenderId: "794043425274",
  appId: "1:794043425274:web:b74919a1d65c9666680443"
};

// Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const storage = getStorage();
  export const db = getFirestore();
  export const auth = getAuth(app);

  

//Storage
//obtener url de las imagenes del
export async function getMenuImage(filename){
  const itemRef = ref(storage, "menuImages/" + filename)
  const response = await getDownloadURL(itemRef)
  return response;
}


//firestore
export async function getMenuData(collectionName) {
  const menuCollection = collection(db, "menu");
  const menuSnapshot = await getDocs(menuCollection);
  let data = [];

  for (let doc of menuSnapshot.docs) {
    const innerCollection = collection(doc.ref, collectionName);
    const innerSnapshot = await getDocs(innerCollection);

    for (let innerDoc of innerSnapshot.docs) {
      // Empujar un objeto que contiene tanto los datos del documento como su ID
      data.push({
        id: innerDoc.id,
        ...innerDoc.data()
      });
    }
  }

  return data;
}


export async function getPlateData(collectionName, plateIndex) {
  const collectionRef = collection(db, "menu");
  const collectionSnapshot = await getDocs(collectionRef);
  let data = [];

  for (let doc of collectionSnapshot.docs) {
    const innerCollection = collection(doc.ref, collectionName);
    const innerSnapshot = await getDocs(innerCollection);

    for (let innerDoc of innerSnapshot.docs) {
      data.push({
        id: innerDoc.id,
        ...innerDoc.data()
      });
    }
  }

  return data[plateIndex];
}

//auth
export const saveUser = async (idUser,name) =>{
  await setDoc(doc(db, "users", idUser), {name});
}