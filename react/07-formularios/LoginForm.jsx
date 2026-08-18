/**
 * TEMA: Controlled vs Uncontrolled Components
 *
 * Controlled: React controla el valor via state (value + onChange).
 * Uncontrolled: el DOM controla el valor (useRef para leer).
 */

import { useRef, useState } from 'react';

// Controlled (recomendado para validación en tiempo real)
function ControlledForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email.includes('@')) newErrors.email = 'Email inválido';
    if (password.length < 8) newErrors.password = 'Mínimo 8 caracteres';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Login:', { email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <span>{errors.email}</span>}

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <span>{errors.password}</span>}

      <button type="submit">Ingresar</button>
    </form>
  );
}

// Uncontrolled (útil para formularios simples o integración con libs)
function UncontrolledForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" ref={emailRef} defaultValue="" />
      <input type="password" ref={passwordRef} />
      <button type="submit">Ingresar</button>
    </form>
  );
}

export { ControlledForm, UncontrolledForm };
/**
 * ¿Qué es mejor: Controlled Forms o Uncontrolled Forms?
 *
 * - *Controlled Forms* (formularios controlados) son aquellos donde los valores
 *   de los campos viven en el state de React usando useState. Cada cambio dispara
 *   un setState, y tienes acceso inmediato a los valores/errores, puedes hacer validaciones live y lógica reactiva. 
 *   Es la forma más idiomática en React para formularios complejos, validaciones, formularios dinámicos, etc.
 *
 * - *Uncontrolled Forms* (formularios no controlados) usan refs para acceder directamente
 *   a los campos del DOM. Son útiles en formularios MUY simples, cuando necesitas interoperar
 *   con librerías externas, o si la performance es crítica y no quieres rerender en cada pulsación.
 *
 * 👉 ¿Cuál usar?
 * - Usa *Controlled* si necesitas validaciones, condicionales, dependencias entre campos, formularios largos, feedback en tiempo real, etc.
 * - Usa *Uncontrolled* si el formulario es muy sencillo, no necesitas validar en tiempo real, o requieres integración con código legacy/libs DOM puro.
 *
 * En proyectos reales, *Controlled Forms* ofrecen más flexibilidad, mantenibilidad y se integran mejor con la filosofía de React.
 * Pero los *Uncontrolled* pueden ser útiles para casos rápidos o de interoperabilidad.
 */