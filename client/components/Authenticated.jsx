import React from 'react'

import { auth } from '../../server/firebase.config'

const isAuthenticated = () => {
  const user = auth.currentUser
  console.log(user)
  return user ? true : false
}

export function IfAuthenticated({ children }) {
  return isAuthenticated() ? <>{children}</> : null
}

export function IfNotAuthenticated({ children }) {
  return !isAuthenticated() ? <>{children}</> : null
}
