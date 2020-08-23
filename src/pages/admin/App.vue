<!--
 * @Descripttion: 文档
 * @Author: asyncnode
 * @Date: 2020-05-13 10:37:47
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-23 12:14:54
-->
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
