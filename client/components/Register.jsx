import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../apiClient'
import { updateLoggedInUser } from '../actions/loggedInUser'

function Register() {
  const user = useSelector((state) => state.loggedInUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    username: '',
  })

  useEffect(() => {
    if (user.username) navigate('/')
  }, [user])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userInfo = {
      auth0Id: user.auth0Id,
      ...form,
    }
    console.log(userInfo, user.token)
    addUser(userInfo, user.token)
      .then(() => dispatch(updateLoggedInUser(userInfo)))
      .catch((err) => console.log(err.message))
  }

  return (
    <div className="register-container">
      <h2>Complete profile set up</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />

        <button disabled={!form.username} className="btn-primary">
          Save profile
        </button>
      </form>
    </div>
  )
}

export default Register
