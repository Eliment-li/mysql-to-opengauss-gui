<template>
  <div id="app">
    <!-- homepage mian   -->
    <DatabaseConfig></DatabaseConfig>
  </div>
</template>

<script>

import DatabaseConfig from './components/DatabaseConfig.vue'

export default {
  name: 'App',
  components: {
    DatabaseConfig
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
