import {store} from '../stores/user'

export const isLogued = ()=> {
    const user = store.getUser()
    return Object.keys(user).length === 0 && user.constructor === Object
}