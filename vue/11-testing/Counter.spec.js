<script setup>
/**
 * TEMA: Testing con Vitest + Vue Test Utils
 */

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Counter from '../02-composition-api/03-options-api.vue';

describe('Counter', () => {
  it('muestra el contador inicial', () => {
    const wrapper = mount(Counter, {
      props: { initialCount: 5 },
    });
    expect(wrapper.text()).toContain('5');
  });

  it('incrementa al hacer click', async () => {
    const wrapper = mount(Counter);
    await wrapper.find('button').trigger('click');
    expect(wrapper.text()).toContain('1');
  });

  it('emite evento changed', async () => {
    const wrapper = mount(Counter);
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('changed')).toBeTruthy();
    expect(wrapper.emitted('changed')[0]).toEqual([1]);
  });
});

// Tips:
// - mount() vs shallowMount() (no renderiza hijos)
// - getByRole preferido si usas Testing Library
// - Mock stores: createTestingPinia()
// - Testear composables: importar y llamar directamente
