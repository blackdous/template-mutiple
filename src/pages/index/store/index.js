/*
 * @Descripttion: store index.js 用于初始化store，后期会坐到懒加载 store 中的modules
 * @Author: all
 * @Date: 2020-07-22 15:40:42
 * @LastEditors: heidous
 * @LastEditTime: 2020-07-28 16:38:46
 */
import Vue from 'vue';
import Vuex from 'vuex';
// import main from './modules/main';
// 挂载Vuex
Vue.use(Vuex);

const modulesStore = require.context('./modules', true, /\.js$/);
console.log('modulesStore: ', modulesStore.keys());

const modules = modulesStore.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  // console.log('moduleName: ', moduleName);
  const value = modulesStore(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
console.log('modules: ', modules);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    modulesList: {
      namespaced: true,
      state: {
        ...modules
      }
    },
    main: modules.main
  }
});

export default store;
