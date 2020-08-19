/*
 * @Descripttion:
 * @Author: asyncnode
 * @Date: 2020-03-23 12:08:30
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-17 14:59:14
 */

// import '@babel/polyfill';

import Vue from 'vue';
{{#vuex}}
import store from '@/store';
{{/vuex}}
{{#router}}
import router from '@/router';
{{/router}}
// import  VuexStoreRegister './plugins/vuexLazy';
import App from './App';
{{#pwa}}
import registerServiceWorker from './registerServiceWorker';
{{/pwa}}
{{#tsConfig}}
import { testTypescript } from './currency';
{{/tsConfig}}
import { addFunc } from './utils';
// import './asstes/scss/index.scss';
import './theme/index.scss';
{{#vuex}}
const VuexStoreRegister = require('./plugins/vuexLazy');
// Vue.filter('currency', currencyFilter);
Vue.use(VuexStoreRegister);
{{/vuex}}
{{#tsConfig}}
testTypescript();
{{/tsConfig}}
const aa = addFunc(11, 22);
console.log('aa: ', aa);

Vue.config.productionTip = false;
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#vuex}}
  store,
  {{/vuex}}
  components: { App },
  template: '<App/>'
});
{{#pwa}}
registerServiceWorker();
{{/pwa}}
