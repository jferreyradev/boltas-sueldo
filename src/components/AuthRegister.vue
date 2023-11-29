<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const props = defineProps({
  title: {
    type: String,
    default: 'Alta de usuarios'
  },
  description: {
    type: String,
    default: 'Ingrese los datos darse de alta en el sistema "mis boletas"'
  }
})

const loading = ref(false)
const nrodoc = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const toggle = ref(false)
const verify = ref(false)

const checkDoc = async () => {
  try {
    loading.value = true
    let { data, error } = await supabase.from('admin_dni').select('level').eq('nro', nrodoc.value)

    if (error) throw error

    if (data && data.length > 0) {
      verify.value = true
    } else {
      verify.value = true
      alert('El dato proporcionado no existe en nuetsra base de datos!')
    }
    return false
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}

const signUp = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          first_name: firstName.value,
          last_name: lastName.value,
          nro_doc: nrodoc.value
        }
      }
    })
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
    await signUp()
}

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <h1>{{ props.title }}</h1>
      <p>{{ props.description }}</p>
      
      <div class="box-input">
        <input
          class="inputField"
          required
          type="number"
          placeholder="Nro de documento"
          v-model="nrodoc"
          v-on:focusout="checkDoc"
        />
        <input class="inputField" required type="text" placeholder="Apellido" v-model="lastName" />
        <input class="inputField" required type="text" placeholder="Nombre" v-model="firstName" />
      </div>
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
