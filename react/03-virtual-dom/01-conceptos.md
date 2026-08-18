# Virtual DOM, Reconciliation, Diffing

## ¿Qué es el Virtual DOM?

Representación ligera en JavaScript del DOM real. React mantiene un árbol virtual y al cambiar el state:

1. Crea un nuevo Virtual DOM
2. Lo compara con el anterior (Diffing)
3. Calcula el mínimo de cambios necesarios (Reconciliation)
4. Aplica solo esos cambios al DOM real (batch update)

## Diffing Algorithm

React asume dos heurísticas para O(n) en vez de O(n³):

1. **Elementos de distinto tipo** → destruye el árbol anterior y construye uno nuevo
2. **Mismo tipo** → actualiza solo atributos cambiados
3. **Listas** → usa `key` para identificar elementos estables entre renders

## ¿Por qué no usar index como key?

Si reordenas, insertas o eliminas items, el index cambia y React reutiliza el DOM incorrectamente, causando bugs de estado y renders innecesarios.

```jsx
// MAL
{items.map((item, index) => <Item key={index} data={item} />)}

// BIEN
{items.map((item) => <Item key={item.id} data={item} />)}
```
