<template>
  <div id="app">
    <router-view></router-view>
    <img alt="Vue logo" src="../../assets/logo.png">
    <a style="display:block" href="other.html">other page</a>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
