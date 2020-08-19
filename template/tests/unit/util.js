/*
 * @Descripttion:
 * @Author: asyncnode
 * @Date: 2020-05-19 17:28:50
 * @LastEditors: asyncnode
 * @LastEditTime: 2020-05-21 11:11:16
 */

import Vue from 'vue';
// import HopeElement from '../../components/index.js';

// Vue.use(HopeElement);

let id = 0;
/**
 * 创建 element
 * @return {Nodelist} elm 返回一个节点
 */
const createElm = function() {
  const elm = document.createElement('div');
  elm.id = 'app' + ++id;
  document.body.appendChild(elm);
  return elm;
};

/**
 * 销毁Vue 实例
 * @param {Object} vm Vue实例
 */
export const destroyVM = function(vm) {
  vm.$destroy && vm.$destroy();
  vm.$el && vm.$el.parentNode && vm.$el.parentNode.removeChild(vm.$el);
};

/**
 * 创建 Vue实例
 * @param {Object|String} component 组件 or template
 * @param {Boolean} moutued=false  是否添加到 DOM上
 * @return {Object} vm 一个Vue实例
 */
export const createVue = function(component, moutued = false) {
  if (Object.prototype.toString.call(component) === '[object String]') {
    component = { template: component };
  }
  return new Vue(component).$mount(moutued === false ? null : createElm());
};

/**
 * 触发keydown 事件
 * @param {Element} elm dom节点
 * @param {keyCode} int 键盘对应的按键
 */

export const triggerKeyDown = function(elm, keyCode) {
  const event = document.createEvent('Events');
  event.initEvent('keydown', true, true);
  event.keyCode = keyCode;
  elm.dispatchEvent(event);
};
