<template>
  <div id="app">
    <router-view></router-view>
    adasdasd
  </div>
</template>
<script>
export default {
  $isVuex: true,
  name: 'App',
  mounted() {
    console.log(111);
  }
};
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
