import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux'

import { updateLoggedInUser } from './actions/loggedInUser'

// eslint-disable-next-line no-unused-vars
export function useCacheUser() {
  const dispatch = useDispatch()
  const tokenInRedux = useSelector((state) =>
    Boolean(state.loggedInUser?.token)
  )

  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0()

  if (isAuthenticated && !tokenInRedux) {
    try {
      // eslint-disable-next-line promise/catch-or-return
      getAccessTokenSilently().then((token) => {
        const userToSave = {
          auth0Id: user?.sub,
          email: user?.email,
          token: token,
        }
        dispatch(updateLoggedInUser(userToSave))
      })
    } catch (err) {
      console.error(err)
    }
  }
}
