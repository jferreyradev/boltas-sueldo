<script setup>
import { ref } from 'vue'

const tipoLiq = [
  {
    id: 1,
    name: 'Mensual'
  },
  {
    id: 5,
    name: 'Adicional'
  },
  {
    id: 2,
    name: '1ER SAC'
  },
  {
    id: 3,
    name: '2DO SAC'
  }
]

const selected = ref('')
const adi = ref('0')
const per = ref('')

const handleSubmit = () => {
    const query = 'tipoLiq='+ selected.value + '&nroAdi='+adi.value + '&periodo='+ (per.value).toString()
  console.log(query)
  const url = 'http://www.serverburru.duckdns.org:3003/api/boletas'
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="box">
      <div>
        <label for="select">Tipo de liquidacion</label>
        <select v-model="selected">
          <option disabled value="">Selecciones alguno</option>
          <option v-for="el in tipoLiq" :key="el.id" :value="el.id">{{ el.name }}</option>
        </select>
      </div>
      <div>
        <label for="nroAdi">Nro. de Adicional</label>
        <input type="number" name="nroadi" id="nroAdi" v-model="adi" />
      </div>
      <div>
        <label for="periodo">Nro. de Adicional</label>
        <input type="date" name="periodo" id="per" v-model="per" />
      </div>
    </div>
    <button type="submit">enviar</button>
  </form>
</template>

<style scoped>
.box {
  display: flex;
  vertical-align: bottom;
}
</style>
