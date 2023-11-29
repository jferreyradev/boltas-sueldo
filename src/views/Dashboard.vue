<script setup>
import { store } from '../stores/user';
import InputFilterLiq from '../components/InputFilterLiq.vue';

function check() {
    const user = store.getUser()
    return Object.keys(user).length === 0 && user.constructor === Object
}

function logout() {
    store.clear()
}

</script>


<template>
  <main>
    <h1>Dashboard</h1>     
    <span v-if="check()" >No esta logueado</span>
    <div v-else>
      <InputFilterLiq />

        <span > {{ store.getUser() }}</span>    
        <button @click="logout()">logout</button>
    </div>
    
  </main>
</template>