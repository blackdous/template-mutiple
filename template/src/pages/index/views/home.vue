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
