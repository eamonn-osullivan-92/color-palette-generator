import React, { useState } from 'react'
import { useNavigate } from 'react-router'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth'
import { auth } from '../../server/firebase.config'

export default function SignIn() {
  const navigate = useNavigate()
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const register = async () => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        navigate('/')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const login = () => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        navigate('/')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <div>
      <div className="form-control">
        <h2>Sign In</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setLoginEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button type="submit" onClick={login}>
          Submit
        </button>
      </div>

      <div className="form-control">
        <h2>Register</h2>
        <label htmlFor="register-email">Email</label>
        <input
          type="email"
          id="register-email"
          onChange={(e) => setRegisterEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password:</label>
        <input
          type="password"
          id="register-password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button type="submit" onClick={register}>
          Submit
        </button>
      </div>
    </div>
  )
}
