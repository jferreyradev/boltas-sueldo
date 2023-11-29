<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'
import { store } from '../stores/user'

const props = defineProps({
  title: {
    type: String,
    default: 'Ingreso al sistema de boletas'
  },
  description: {
    type: String,
    default: 'Ingrese los datos para entrar al sistema "mis boletas"'
  }
})

const loading = ref(false)
const password = ref('')
const email = ref('')

const signIn = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    console.log(data)
    store.setUser(data.user)
    return { data, error }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {  
    await signIn() 
}

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <h1>{{ props.title }}</h1>
      <p>{{ props.description }}</p>     

      <input class="inputField" required type="email" placeholder="email" v-model="email" />
      <input
        class="inputField"
        required
        type="password"
        placeholder="Password"
        v-model="password"
      />

      <div>
        <input type="submit" :value="loading ? 'Loading' : 'Enviar'" :disabled="loading" />
      </div>
    </div>
  </form>
</template>

<style scoped>
.box-input {
  padding-bottom: 1rem;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>