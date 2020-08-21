<!--
 * @Descripttion: 文档
 * @Author: asyncnode
 * @Date: 2020-05-13 10:37:47
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-21 09:26:14
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  $isVuex: true,
  name: 'App'
};
</script>
<style lang="scss">
  #app {
    font-size: 16px;
    font-weight: 500;
  }
</style>
