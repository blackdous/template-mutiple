import { shallowMount } from '@vue/test-utils';
import hpButton from '@com/button/button.vue';

describe('hpButton.vue', () => {
  // * 测试 props
  it('props test', () => {
    const wrapper = shallowMount(hpButton);
    const buttonProps = {
      type: 'danger',
      size: 'lg',
      disabled: true,
      link: true
    };
    wrapper.setProps(buttonProps);
    // 断言已经获取到props
    expect(wrapper.props().size).toBe('lg');
    expect(wrapper.props().type).toBe('danger');
    expect(wrapper.props().disabled).toBe(true);
    expect(wrapper.props().link).toBe(true);
    // ! 每个it结束时执行
    wrapper.destroy();
  });
  // 测试原始type类型
  it('nativeType test', () => {
    const wrapper = shallowMount(hpButton, {
      propsData: {
        nativeType: 'reset'
      }
    });
    const buttonType = wrapper.vm.$el;
    expect(buttonType.getAttribute('type')).toBe('reset');
    // ! 每个it结束时执行
    wrapper.destroy();
  });
  // **测试icon
  it('icon test', () => {
    const wrapper = shallowMount(hpButton, {
      propsData: {
        icon: 'hp-icon-loading'
      }
    });
    const buttonDom = wrapper.vm.$el;
    expect(buttonDom.querySelector('.hp-icon-loading').className).toContain(
      'hp-icon-loading'
    );
    // ! 每个it结束时执行
    wrapper.destroy();
  });
  // **测试loading
  it('loading test', () => {
    const wrapper = shallowMount(hpButton, {
      propsData: {
        loading: true
      }
    });
    const buttonDom = wrapper.vm.$el;
    expect(buttonDom.querySelector('.hp-icon-loading').className).toContain(
      'hp-icon-loading'
    );
    expect(buttonDom.classList).toContain('loading');
    // ! 每个it结束时执行
    wrapper.destroy();
  });
  // **测试disabled
  it('disabled test', () => {
    const wrapper = shallowMount(hpButton, {
      propsData: {
        disabled: true
      }
    });
    const buttonDom = wrapper.vm.$el;
    expect(buttonDom.classList).toContain('disabled');
    // ! 每个it结束时执行
    wrapper.destroy();
  });
  // **测试size
  it('size test', () => {
    const wrapper = shallowMount(hpButton, {
      propsData: {
        size: 'small'
      }
    });
    const buttonDom = wrapper.vm.$el;
    expect(buttonDom.classList).toContain('hp-button--small');
    // ! 每个it结束时执行
    wrapper.destroy();
  });
  // **测试shape
  it('shape test', () => {
    const wrapper = shallowMount(hpButton, {
      propsData: {
        shape: 'round'
      }
    });
    const buttonDom = wrapper.vm.$el;
    expect(buttonDom.classList).toContain('round');
    // ! 每个it结束时执行
    wrapper.destroy();
  });
  // **测试ghost
  it('ghost test', () => {
    const wrapper = shallowMount(hpButton, {
      propsData: {
        ghost: true
      }
    });
    const buttonDom = wrapper.vm.$el;
    expect(buttonDom.classList).toContain('ghost');
    // ! 每个it结束时执行
    wrapper.destroy();
  });
  // 测试$emit
  it('when onclick is called $emit is called', () => {
    const wrapper = shallowMount(hpButton);
    const mockFn1 = jest.fn();

    wrapper.vm.$on('click', mockFn1);

    wrapper.vm.handleClick();
    expect(mockFn1).toBeCalled();
    expect(mockFn1).toHaveBeenCalledTimes(1);
    wrapper.destroy();
    // expect(mockFn1).toHaveBeenCalledWith(event);
  });
  // ** 测试 slots
  it('slots test', () => {
    const wrapper = shallowMount(hpButton, {
      slots: {
        default: 'i am slots text' // 自定义slots内容
      }
    });
    const button = wrapper.find('button');
    expect(button.text()).toBe('i am slots text');
    wrapper.destroy();
  });
  // ** 测试 computed
  it('computed test', () => {
    const wrapper = shallowMount(hpButton);
    const buttonProps = {
      size: 'small'
    };
    wrapper.setProps(buttonProps);
    expect(wrapper.vm.buttonSize).toBe('small');
    wrapper.destroy();
  });

  // 测试内容：snapshot->概括的测试DOM结构
  // 如果组件内存在比较特殊的需要测试的DOM结构的话，可以单独测试
  it('matches snapshot', () => {
    const wrapper = shallowMount(hpButton);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.destroy();
  });
});
