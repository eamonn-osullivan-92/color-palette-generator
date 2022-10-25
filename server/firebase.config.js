// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCfxQc4sCLUMMpQ0eWUO_ApX1_QN0sunUs', //env
  authDomain: 'colorful-life-fb.firebaseapp.com', //env
  projectId: 'colorful-life-fb',
  storageBucket: 'colorful-life-fb.appspot.com',
  messagingSenderId: '989921300401',
  appId: '1:989921300401:web:3b3be33529d5b8703c3790',
  measurementId: 'G-3BF686FDEF',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
