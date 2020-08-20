<!--
 * @Descripttion: HelloWorld.vue
 * @Author: heidous
 * @Date: 2020-07-23 23:57:38
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-19 14:27:44
-->
<template>
  <div class="hello">
    <h1></h1>
    <h2>Vuex</h2>
    <!-- <router-link to="/vuex">ShoppingCart Example</router-link> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  mounted() {
    this.hello();
    const a = '11';
    console.log('a: ', a);
  },
  methods: {
    hello() {
      // console.log('Hello world')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
