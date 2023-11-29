import { reactive } from 'vue'

export const store = reactive({
  user: {},
  getUser() {
    //sessionStorage.getItem('user')
    return this.user
  },
  setUser(user){
    //sessionStorage.setItem('user',user)
    this.user = user
  },
  clear(){
    this.user={}
  },
  isloged(){
    const result =  Object.keys(this.user).length === 0 && this.user.constructor === Object
    return result
  }
})