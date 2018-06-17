import { userService } from '../services/UserService'

export function requiresAuth (to) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!userService.isAuthenticated()) {
        return location.href = '/login'
      }

      userService.setAxiosDefaultAuthorizationHeader()
    }

    return Promise.resolve(to)
}

export function guestOnly (to) {
    if (to.matched.some(record => record.meta.guestOnly) && userService.isAuthenticated()) {
        return Promise.reject({ name: 'galleries' })
    }

    return Promise.resolve(to)
}