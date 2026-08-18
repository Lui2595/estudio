/**
 * TEMA: Compound Components Pattern
 * 
 * Este patrón permite construir componentes complejos (como Tabs) usando varios componentes "hijo"
 * que se comunican entre sí mediante un contexto compartido.
 * Así es sencillo crear APIs declarativas y flexibles, donde la lógica de estado está en el componente padre
 * (Tabs) y los hijos (TabList, Tab, TabPanels, TabPanel) pueden acceder y modificar ese estado 
 * de manera interna, sin necesidad de pasar props explícitamente.
 *
 * Cada parte:
 *  - Tabs:          Define el contexto y almacena cuál tab está activo.
 *  - TabList:       Agrupa los tabs y define la barra de pestañas.
 *  - Tab:           Botón que representa una pestaña individual. Cambia el tab activo al clickear.
 *  - TabPanels:     Agrupa todos los paneles de contenido.
 *  - TabPanel:      Contiene el contenido de un tab y solo se muestra si está activo.
 * 
 * Ejemplo de uso declarativo:
 * <Tabs defaultTab={0}>
 *   <Tabs.List>
 *     <Tabs.Tab index={0}>General</Tabs.Tab>
 *     <Tabs.Tab index={1}>Seguridad</Tabs.Tab>
 *   </Tabs.List>
 *   <Tabs.Panels>
 *     <Tabs.Panel index={0}>Contenido general</Tabs.Panel>
 *     <Tabs.Panel index={1}>Contenido seguridad</Tabs.Panel>
 *   </Tabs.Panels>
 * </Tabs>
 */

import { createContext, useContext, useState } from 'react';

// Creamos un contexto para compartir el estado del tab seleccionado entre todos los componentes hijos.
const TabsContext = createContext(null);

// Componente principal de Tabs. Gestiona el estado del tab activo.
// Recibe children, que pueden ser TabList/TabPanels, y un defaultTab que indica el tab seleccionado inicial.
function Tabs({ children, defaultTab = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultTab);

  // Se provee el estado y el setter a los hijos mediante el contexto.
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

// Componente para agrupar todos los tabs visibles (la barra superior de opciones)
// Solo renderiza un contenedor, sus hijos suelen ser <Tab>
function TabList({ children }) {
  return <div className="tab-list" role="tablist">{children}</div>;
}

// Representa una pestaña individual. Al hacer click, actualiza el tab activo usando setActiveIndex desde el contexto.
function Tab({ index, children }) {
  const { activeIndex, setActiveIndex } = useContext(TabsContext);

  return (
    <button
      role="tab"
      aria-selected={activeIndex === index}
      onClick={() => setActiveIndex(index)}
    >
      {children}
    </button>
  );
}

// Agrupa los paneles de contenido (uno por tab), pero no gestiona visibilidad: eso lo hace TabPanel.
function TabPanels({ children }) {
  return <div className="tab-panels">{children}</div>;
}

// Panel de contenido para un tab específico. Solo renderiza el contenido si el índice coincide con el tab activo.
function TabPanel({ index, children }) {
  const { activeIndex } = useContext(TabsContext);
  if (activeIndex !== index) return null; // Solo muestra el contenido del tab seleccionado.
  return <div role="tabpanel">{children}</div>;
}

// Añadimos las subcomponentes como propiedades del componente Tabs para permitir uso estilo <Tabs.Tab>...
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

export default Tabs;
