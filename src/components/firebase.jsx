// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { getAuth, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// const firebaseConfig = {
//   apiKey: "AIzaSyDiw-g5bngsRBUD2Zr8v__3QzCtQmwb32A",
//   authDomain: "chat-11df9.firebaseapp.com",
//   projectId: "chat-11df9",
//   storageBucket: "chat-11df9.appspot.com",
//   messagingSenderId: "578380463410",
//   appId: "1:578380463410:web:08e22184929c5212a72b2b",
//   measurementId: "G-H8C98NSREB"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBvoBFbMRhi8dhy6cEIsnjBk8myJDqvyBw",
  authDomain: "mypsr-backup.firebaseapp.com",
  projectId: "mypsr-backup",
  storageBucket: "mypsr-backup.appspot.com",
  messagingSenderId: "779681012043",
  appId: "1:779681012043:web:f0e75a35261bdcca0df0ce",
  measurementId: "G-1C3M99MCTE"
};

// the db that kena usage limit
// const firebaseConfig = {
//   apiKey: "AIzaSyBymbzTkYRjuKaV7pym484v7rnOpHjloFg",
//   authDomain: "mypsr-dc320.firebaseapp.com",
//   projectId: "mypsr-dc320",
//   storageBucket: "mypsr-dc320.appspot.com",
//   messagingSenderId: "541265964220",
//   appId: "1:541265964220:web:c49333fe38245386f3b4b9",
//   measurementId: "G-6CPLWGZGDL"
// };

// original US db I think
// const firebaseConfig = {
//   apiKey: "AIzaSyBaN2LjRT_HJ5K9plN0yQ5ztcPxBR97508",
//   authDomain: "mypsr-test-dcf48.firebaseapp.com",
//   projectId: "mypsr-test-dcf48",
//   storageBucket: "mypsr-test-dcf48.appspot.com",
//   messagingSenderId: "793615244439",
//   appId: "1:793615244439:web:2fa6de185f6b65353b5dd2"
// };

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth()

export const storage = getStorage()
export async function upload(file, user, setUserInfo, setLoading) {
  setLoading(true)
  let photoURL = 'https://firebasestorage.googleapis.com/v0/b/mypsr-backup.appspot.com/o/defaultProfile.jpg?alt=media&token=c573eed3-2637-4e95-b304-5d33e5d82736'
  if (file) {
    const fileRef = ref(storage, `${user.uid}.png`)
    const snapshot = await uploadBytes(fileRef, file)
    photoURL = await getDownloadURL(fileRef)
  }
  const usersRef = doc(db, "users", user.uid)
  await updateDoc(usersRef, {
    'photoURL': photoURL
  })
  updateProfile(user, {
    photoURL: photoURL
  }).then(() => {
      // updates picture shown on page
      setUserInfo(prevState => ({
        ...prevState,
        photo: photoURL
      }))
      setLoading(false)
  }).catch((error) => {
      // An error occurred
      // ...
  });
  // window.location.reload()
}

