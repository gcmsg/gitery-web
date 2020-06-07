import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import About from '@/components/About.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const name = 'new message';
    const wrapper = shallowMount(About, {
      propsData: { name },
    });
    expect(wrapper.text()).to.include(name);
  });
});
