/*
 * @Descripttion:
 * @Author: asyncnode
 * @Date: 2020-05-24 23:26:10
 * @LastEditors: asyncnode
 * @LastEditTime: 2020-05-25 14:52:56
 */
import { localVue, mount } from '@vue/test-utils';
import Vue from 'vue';
import hpBreadcrumb from '@com/breadcrumb/breadcrumb';
import hpBreadcrumbItem from '@com/breadcrumb/breadcrumb-item';
describe('breadcrumb', () => {
  let wrapper;
  Vue.component('hpBreadcrumb', hpBreadcrumb);
  Vue.component('hpBreadcrumbItem', hpBreadcrumbItem);
  afterEach(() => {
    wrapper.destroy();
  });
  it('breadcrumb test', (done) => {
    const TestCom = Vue.component('TestCom', {
      template: `<hp-breadcrumb ref="breadC" separator=">">
      <hp-breadcrumb-item repalce :to="{ path: '/' }" ref="breadCItem">活动列表 </hp-breadcrumb-item>
      <hp-breadcrumb-item>活动列表1 </hp-breadcrumb-item>
    </hp-breadcrumb>`
    });
    wrapper = mount(TestCom, {
      localVue,
      stubs: []
    });
    Vue.nextTick((_) => {
      expect(wrapper.vm.$refs.breadC.separator).toBe('>');
      expect(wrapper.vm.$refs.breadCItem.repalce).toEqual(true);
      expect(wrapper.vm.$refs.breadCItem.to.path).toBe('/');
      expect(
        wrapper.vm.$el.querySelectorAll('.hp-breadcrumb__item').length
      ).toBe(2);
      // console.log(
      //   wrapper.vm.$refs.breadC.$el.querySelector('.hp-breadcrumb__separator')
      //     .innerText
      // );
      // console.log(wrapper.vm.$refs.breadCItem.to);
    });
    done();
  });
});
