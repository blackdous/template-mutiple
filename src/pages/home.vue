<!--
 * @Descripttion: Home.vue
 * @Author: heidous
 * @Date: 2020-07-23 23:54:09
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-19 14:36:10
-->
<template>
  <div class="home">
    <HelloWorld
      msg="Welcome to Your Vue.js + TypeScript App"
    />
    <router-link
      to="/userinfo"
      >userinfo</router-link
    >
    <router-link
      to="/userdetail"
      >userdetail</router-link
    >
  </div>
</template>
<script lang="ts">
import {
  Component,
  Vue
} from 'vue-property-decorator';
import HelloWorld from '@com/typescript/HelloWorld'; // @com is an alias to /component
@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {};
</script>
