import 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDmIgDHvkZGt66C9MVAQIBcKgD7z6ViDM4",
    authDomain: "olivyae-58b01.firebaseapp.com",
    databaseURL: "https://olivyae-58b01-default-rtdb.firebaseio.com",
    projectId: "olivyae-58b01",
    storageBucket: "olivyae-58b01.appspot.com",
    messagingSenderId: "717334486380",
    appId: "1:717334486380:web:8425741ba410e141c26749",
    measurementId: "G-2WKB37HQWS"
  }

const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()