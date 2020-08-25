import Vue from 'vue';
{{#vuex}}
import store from './store';
{{/vuex}}
{{#router}}
import router from './router';
{{/router}}
import App from './App';
{{#pwa}}
import registerServiceWorker from '@/registerServiceWorker';
{{/pwa}}
{{#tsConfig}}
import { testTypescript } from '@/currency';
{{/tsConfig}}
import { addFunc } from '@/utils';
import '@/asstes/scss/index.scss';
import '@public/static/css/normalize.min.css';
{{#vuex}}
const VuexStoreRegister = require('@/plugins/vuexLazy');
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
