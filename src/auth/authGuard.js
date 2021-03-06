import { getInstance } from './index'

import { POST_NON_DUB_USER } from '../config/path'

import store from '../store'

import axios from 'axios'

export const authGuard = (to, from, next) => {
  const authService = getInstance()

  const fn = async () => {
    if (authService.isAuthenticated) {
      if (store.state.user.initialized) {
        return next()
      } else {
        store.commit('setLoading', true)

        // make sure the user is already registered inside of the app itself with its this.$auth.user.sub
        const token = await authService.getTokenSilently()
        // console.log(authService.user)
        try {
          const { data } = await axios.post(
            POST_NON_DUB_USER(),
            {
              sub: authService.user.sub,
              email: authService.user.email,
              name: authService.user.name,
              picture: authService.user.picture
            },
            {
              headers: {
                Authorization: `Bearer ${token}` // send the access token through the 'Authorization' header
              }
            }
          )
          store.commit('setToken', {
            token,
            ...data
          })
        } catch (error) {
          console.error(Object.keys(error), error.message)
        }
        store.commit('setLoading', false)

        return next()
      }
    } else {
      authService.loginWithRedirect({
        appState: {
          targetUrl: to.fullPath
        }
      })
    }
  }

  if (!authService.loading) {
    return fn()
  }

  authService.$watch('loading', loading => {
    if (loading === false) {
      return fn()
    }
  })
}
