/*
 * @Descripttion:
 * @Author: asyncnode
 * @Date: 2020-05-19 11:52:24
 * @LastEditors: blackdous
 * @LastEditTime: 2020-07-23 09:08:37
 */

import { shallowMount, localVue, mount } from '@vue/test-utils';
// import { triggerKeyDown } from '../util';
import hpRadio from '@com/radio/radio.vue';
import hpRadioGroup from '@com/radio/radio-group';
import Vue from 'vue';

// 创建临时Vue实例，挂载组件中使用的插件
// const localVue = createLocalVue();

describe('Radio', () => {
  let wrapper;
  afterEach(() => {
    wrapper.destroy();
  });
  Vue.component('hpRadio', hpRadio);
  Vue.component('hpRadioGroup', hpRadioGroup);
  it('checked test', (done) => {
    wrapper = shallowMount(hpRadio, {
      propsData: {
        radio: ''
      }
    });
    const radioDom = wrapper.vm.$el;
    wrapper.trigger('click');
    Vue.nextTick((_) => {
      expect(radioDom.classList).toContain('checked');
    });
    // ! 每个it结束时执行
    done();
  });
  it('disabled test', (done) => {
    const TestCom = Vue.component('TestCom', {
      template:
        '<hp-radio label="11" v-model="radio" :disabled="disabled"> 备选项 </hp-radio>',
      data() {
        return {
          radio: '',
          disabled: true
        };
      }
    });
    wrapper = mount(TestCom, { localVue, stubs: [] });
    wrapper.trigger('click');
    Vue.nextTick(() => {
      expect(wrapper.vm.radio).toBe('');
      expect(wrapper.classes()).toContain('disabled');
    });
    done();
  });
  it('change event', (done) => {
    const TestCom = Vue.component('TestCom', {
      template:
        '<hp-radio label="11" v-model="radio" @change="handleChange"> 备选项 </hp-radio>',
      data() {
        return {
          radio: '',
          radioValue: ''
        };
      },
      methods: {
        handleChange(val) {
          this.radioValue = val;
        }
      }
    });
    wrapper = mount(TestCom, { localVue, stubs: [] });
    wrapper.trigger('click');
    Vue.nextTick(() => {
      expect(wrapper.vm.radioValue).toBe('11');
    });
    // TestCom.destroy();
    done();
  });
  it('change event only triggers on user input', (done) => {
    const TestCom = Vue.component('TestCom', {
      template:
        '<hp-radio label="11" v-model="radio" @change="handleChange"> 备选项 </hp-radio>',
      data() {
        return {
          radio: '',
          radioValue: ''
        };
      },
      methods: {
        handleChange(val) {
          this.radioValue = val;
        }
      }
    });
    wrapper = mount(TestCom, { localVue, stubs: [] });
    wrapper.vm.radio = '11';
    Vue.nextTick(() => {
      expect(wrapper.vm.radioValue).toBe('');
    });
    // TestCom.destroy();
    done();
  });

  describe('Radio group', () => {
    it('create || size', async (done) => {
      const TestCom = Vue.component('TestCom', {
        template: `<hp-radio-group
          v-model="radioValue"
          size="mini"
        >
          <hp-radio :label="11" ref="radio1"> 备选项 </hp-radio>
          <hp-radio :label="22" ref="radio2"> 备选项 </hp-radio>
          <hp-radio :label="33"> 备选项 </hp-radio>
        </hp-radio-group>`,
        data() {
          return {
            radioValue: 11
          };
        },
        methods: {
          handleChange(val) {
            this.radioValue = val;
          }
        }
      });
      wrapper = mount(TestCom, { localVue, stubs: [] });
      expect(wrapper.vm.$el.querySelectorAll('.hp-radio--mini').length).toEqual(
        3
      );
      await setTimeout(() => {
        expect(
          wrapper.vm.$refs.radio1.$el.querySelector('.checked').className
        ).toContain('checked');
        const radioElm = wrapper.vm.$refs.radio2.$el;
        radioElm.click();
        Vue.nextTick(() => {
          expect(radioElm.querySelector('.checked').className).toContain(
            'checked'
          );
          expect(wrapper.vm.radioValue === 22).toBe(true);
        });
        done();
      }, 50);
    });
    it('change event & change event only triggers on user input', (done) => {
      const TestCom = Vue.component('TestCom', {
        template: `<hp-radio-group
        v-model="radioValue"
        @change="handleChange"
      >
        <hp-radio :label="11" ref="radio1"> 备选项 </hp-radio>
        <hp-radio :label="22" ref="radio2"> 备选项 </hp-radio>
        <hp-radio :label="33"> 备选项 </hp-radio>
      </hp-radio-group>`,
        data() {
          return {
            radioValue: 33,
            data: ''
          };
        },
        methods: {
          handleChange(val) {
            this.data = val;
          }
        }
      });
      wrapper = mount(TestCom, {
        localVue,
        stubs: []
      });
      const radio2 = wrapper.vm.$refs.radio2;
      radio2.$el.click();
      Vue.nextTick(() => {
        expect(wrapper.vm.data).toBe(22);
        wrapper.vm.radioValue = 33;
        expect(wrapper.vm.radioValue).toBe(33);
        expect(wrapper.vm.data).toBe(22);
        done();
      });
    });
    it('disabled', (done) => {
      const TestCom = Vue.component('TestCom', {
        template: `<hp-radio-group
        v-model="radioValue"
        disabled
      >
        <hp-radio :label="11" ref="radio1"> 备选项 </hp-radio>
        <hp-radio :label="22" ref="radio2"> 备选项 </hp-radio>
        <hp-radio :label="33"> 备选项 </hp-radio>
      </hp-radio-group>`,
        data() {
          return {
            radioValue: 11
          };
        }
      });
      wrapper = mount(TestCom, {
        localVue,
        stubs: []
      });
      const radio2 = wrapper.vm.$refs.radio2;
      const radio1 = wrapper.vm.$refs.radio1;
      expect(wrapper.vm.$el.querySelectorAll('label.disabled').length).toEqual(
        3
      );
      expect(radio1.$el.querySelector('.checked').className).toContain(
        'checked'
      );
      radio2.$el.click();
      Vue.nextTick(() => {
        expect(wrapper.vm.radioValue).toEqual(11);
        expect(radio1.$el.querySelector('.checked').className).toContain(
          'checked'
        );
        done();
      });
    });
    // it('keyboard event', (done) => {
    //   const TestCom = localVue.component('TestCom', {
    //     el: document.body,
    //     template: `<hp-radio-group
    //     v-model="radioValue"
    //     type="button"
    //     size="mini"
    //   >
    //     <hp-radio :label="11" ref="radio1"> 备选项 </hp-radio>
    //     <hp-radio :label="22" ref="radio2"> 备选项 </hp-radio>
    //     <hp-radio :label="33"> 备选项 </hp-radio>
    //   </hp-radio-group>`,
    //     data() {
    //       return {
    //         radioValue: 22
    //       };
    //     }
    //   });
    //   // wrapper = mount(TestCom, {
    //   //   localVue
    //   // });
    //   // TestCom.$mount()
    //   console.log('TestCom: ', TestCom);
    //   // expect(TestCom.radioValue).toEqual(22);
    //   // wrapper.vm.$nextTick(() => {
    //   // triggerKeyDown(wrapper.vm.$refs.radio2.$el, 37);
    //   // triggerKeyDown(wrapper.vm.$refs.radio2.$el, 37);
    //   // expect(wrapper.vm.radioValue).toBe(11);
    //   // wrapper.vm.$nextTick(() => {
    //   //   console.log('wrapper.vm: ', wrapper.vm.$data);
    //   //   done();
    //   // });
    //   // setTimeout(() => {}, 100);
    //   // });
    // });
  });
  describe('Radio Button', () => {
    it('create', (done) => {
      const TestCom = Vue.component('TestCom', {
        template: `<hp-radio-group
        v-model="radioValue"
        type="button"
      >
        <hp-radio :label="11" ref="radio1"> 备选项 </hp-radio>
        <hp-radio :label="22" ref="radio2"> 备选项 </hp-radio>
        <hp-radio :label="33"> 备选项 </hp-radio>
      </hp-radio-group>`,
        data() {
          return {
            radioValue: 22
          };
        }
      });
      wrapper = mount(TestCom, {
        localVue,
        stubs: []
      });
      // const radio2 = wrapper.vm.$refs.radio2;
      // const radio1 = wrapper.vm.$refs.radio1;
      expect(
        wrapper.vm.$refs.radio2.$el.querySelector('.checked').className
      ).toContain('checked');
      wrapper.vm.$refs.radio1.$el.click();
      // console.log('radio1: ', radio1);
      Vue.nextTick(() => {
        expect(
          wrapper.vm.$refs.radio1.$el.querySelector('.checked').className
        ).toContain('checked');
        expect(wrapper.vm.radioValue).toBe(11);
        done();
      });
      done();
    });
    it('radio-button change event & change event only triggers on user input', (done) => {
      const TestCom = Vue.component('TestCom', {
        template: `<hp-radio-group
        v-model="radioValue"
        @change="handleChange"
        type="button"
      >
        <hp-radio :label="11" ref="radio1"> 备选项 </hp-radio>
        <hp-radio :label="22" ref="radio2"> 备选项 </hp-radio>
        <hp-radio :label="33"> 备选项 </hp-radio>
      </hp-radio-group>`,
        data() {
          return {
            radioValue: 33,
            data: ''
          };
        },
        methods: {
          handleChange(val) {
            this.data = val;
          }
        }
      });
      wrapper = mount(TestCom, {
        localVue,
        stubs: []
      });
      const radio2 = wrapper.vm.$refs.radio2;
      radio2.$el.click();
      Vue.nextTick(() => {
        expect(wrapper.vm.data).toBe(22);
        wrapper.vm.radioValue = 33;
        expect(wrapper.vm.radioValue).toBe(33);
        expect(wrapper.vm.data).toBe(22);
        done();
      });
    });
    it('size', (done) => {
      const TestCom = Vue.component('TestCom', {
        template: `<hp-radio-group
        v-model="radioValue"
        type="button"
        size="mini"
      >
        <hp-radio :label="11" ref="radio1"> 备选项 </hp-radio>
        <hp-radio :label="22" ref="radio2"> 备选项 </hp-radio>
        <hp-radio :label="33"> 备选项 </hp-radio>
      </hp-radio-group>`,
        data() {
          return {
            radioValue: 33
          };
        }
      });
      wrapper = mount(TestCom, {
        localVue,
        stubs: []
      });
      Vue.nextTick((_) => {
        expect(
          wrapper.vm.$el.querySelectorAll('.hp-radio--mini').length
        ).toEqual(3);
        done();
      });
    });
  });
});
