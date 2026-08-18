# Preguntas y Respuestas — Testing Vue

> Review rápido sin código.

---

**P: ¿Stack de testing Vue 3?**
R: Vitest (runner, compatible Vite) + @vue/test-utils (mount components) + opcional Testing Library.

---

**P: mount vs shallowMount?**
R: mount: renderiza hijos reales. shallowMount: stub de componentes hijos. mount para integration, shallow para unit aislado.

---

**P: ¿Cómo testear emits?**
R: wrapper.emitted('eventName') retorna array de payloads. expect(wrapper.emitted('changed')[0]).toEqual([1]).

---

**P: ¿Testear Pinia?**
R: createTestingPinia({ initialState, stubActions }). O mockear useAuthStore.

---

**P: trigger vs setValue?**
R: trigger('click') para eventos DOM. setValue() para inputs. Ambos async con await.

---

**P: ¿Testear composables?**
R: Llamar useFetch() directamente en test. Controlar fetch con vi.mock o MSW.

---

**P: RTL philosophy en Vue?**
R: Igual que React: testear comportamiento usuario, no implementation. getByRole, user-event.
