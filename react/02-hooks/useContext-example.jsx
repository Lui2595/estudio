/**
 * TEMA: useContext / Context API
 * 
 * ¿Por qué necesitamos Context?
 * Imagina que tienes una variable global o una función que quieres usar en muchos componentes distintos,
 * pero esos componentes no están directamente relacionados o están muy lejos uno del otro en el árbol de componentes.
 * Si solo usas "props", tienes que pasar manualmente ese dato por cada componente intermedio ("prop drilling").
 * 
 * Context te permite "inyectar" datos/funcionalidades en todo el árbol de componentes sin prop drilling:
 * - Declaras un Contexto (una especie de caja donde guardar datos/fns).
 * - Envuelves tus componentes en un "Provider" que le da valor a ese contexto.
 * - Cualquier componente "hijo" puede consumir el valor usando useContext(Contexto).
 */

// 1. Importamos las funciones necesarias de React:
// - createContext: Para crear el contexto.
// - useContext: Para usar el contexto.
// - useState: Para guardar el tema (light/dark) y poder cambiarlo con setState.
import { createContext, useContext, useState } from 'react';

// 2. Creamos un objeto Contexto. El valor inicial puede ser null hasta que lo proveamos desde el Provider.
const ThemeContext = createContext(null);

/**
 * 3. Creamos el "Provider" de este contexto.
 *    Su trabajo es:
 *    - Tener el estado centralizado del tema (claro/oscuro)
 *    - Compartir el valor y la función para cambiarlo con todos los componentes "hijos"
 * 
 *    Recibe {children}: cualquier componente o árbol renderizado dentro suyo (ver ejemplo de uso abajo)
 */
export function ThemeProvider({ children }) {
  // Guardamos el tema actual en el estado local de este Provider.
  // Por defecto: "light"
  const [theme, setTheme] = useState('light');

  // Definimos una función para alternar entre "light" y "dark"
  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  // Envolvemos a todos los hijos con el ThemeContext.Provider,
  // le pasamos en "value" un objeto con toda la info/funciones que queremos compartir.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * 4. Creamos un custom hook (por convención "useTheme") para consumir cómodamente el contexto.
 * 
 *    ¿Por qué usar un hook y no useContext directo?
 *    - Encapsulamos la validación de estar dentro de un Provider.
 *    - Si algún componente intenta usar useTheme fuera de ThemeProvider, lanzamos un error claro.
 */
export function useTheme() {
  // Obtenemos el valor actual del contexto (un objeto: { theme, toggleTheme })
  const context = useContext(ThemeContext);
  if (!context) {
    // Si el contexto es null, significa que no está envuelto por ThemeProvider.
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
}

/**
 * 5. Ejemplo de un componente que consume el contexto: ThemedButton
 * 
 *    - Usa el hook useTheme para recibir el tema actual y la función para cambiarlo.
 *    - Cambia colores y texto según el valor de "theme".
 *    - Al hacer click, alterna entre "light" y "dark".
 */
function ThemedButton() {
  // Extraemos "theme" y "toggleTheme" del contexto.
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        border: '2px solid #666',
        padding: 10,
        fontSize: 18,
        cursor: 'pointer',
        borderRadius: 6,
      }}
    >
      Tema: {theme}
    </button>
  );
}

export default ThemedButton;

/**
 * -----------------------------------------------
 * USO (fuera de este archivo, por ejemplo en App.jsx)
 * 
 * import { ThemeProvider } from './useContext-example';
 * import ThemedButton from './useContext-example';
 * 
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <h1>Ejemplo Context API</h1>
 *       <ThemedButton />
 *       <OtroComponenteQueUsaElTema />
 *     </ThemeProvider>
 *   );
 * }
 * 
 * // Así todos los componentes "dentro" de ThemeProvider pueden acceder a theme/toggleTheme sin prop drilling.
 */