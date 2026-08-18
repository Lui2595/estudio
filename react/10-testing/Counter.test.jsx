/**
 * TEMA: Jest + React Testing Library
 * Probar comportamiento del usuario, no implementación interna.
 * 
 * Ejemplo detallado de cómo hacer test paso a paso:
 * 1. Se renderiza el componente como haría un usuario real en el navegador.
 * 2. Se consulta lo que muestra la pantalla, por ejemplo, el valor del contador.
 * 3. Se simulan acciones del usuario, como hacer click en botones.
 * 4. Se verifica que la UI cambie como corresponde según la interacción.
 */

import { fireEvent, render, screen } from '@testing-library/react';
import Counter from '../01-fundamentos/Counter';

describe('Counter', () => {
  it('muestra el contador inicial', () => {
    // 1. Renderizamos el componente Counter, indicando el contador inicial
    render(<Counter initialCount={5} />);
    // 2. Buscamos el texto que muestra el valor inicial y nos aseguramos de que esté en el documento
    expect(screen.getByText('Count: 5')).toBeInTheDocument();
  });

  it('incrementa al hacer click', () => {
    // 1. Renderizamos el componente con el contador por defecto (que asume 0)
    render(<Counter />);
    // 2. Simulamos un click del usuario en el botón "Incrementar"
    fireEvent.click(screen.getByText('Incrementar'));
    // 3. Verificamos que el contador aumentó y muestra el valor actualizado (1)
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('decrementa al hacer click', () => {
    // 1. Renderizamos el componente con un valor inicial personalizado
    render(<Counter initialCount={3} />);
    // 2. Simulamos un click en el botón "Decrementar"
    fireEvent.click(screen.getByText('Decrementar'));
    // 3. Verificamos que el contador haya disminuido a 2
    expect(screen.getByText('Count: 2')).toBeInTheDocument();
  });
});

// Principios de React Testing Library (RTL):
// - Preferir getByRole > getByText > getByTestId (de más accesible a menos)
// - Probar lo que el usuario ve y hace, no implementación interna
// - No testear el state interno ni métodos privados
