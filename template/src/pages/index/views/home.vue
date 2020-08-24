<!--
 * @Descripttion: Home.vue
 * @Author: heidous
 * @Date: 2020-07-23 23:54:09
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-21 23:50:30
-->
<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <router-link to="/userinfo">index ------- userinfo</router-link>
    <router-link to="/userdetail">index ------- userdetail</router-link>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@com/typescript/HelloWorld'; // @com is an alias to /component
@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>
