/**
 * TEMA: Closures
 * ENTREVISTA MUY COMÚN: Explica closures con un ejemplo.
 *
 * Un closure es cuando una función interna "recuerda" las variables de su entorno (scope léxico)
 * aunque la función exterior ya haya finalizado su ejecución. Es decir, la función interna
 * puede seguir accediendo y usando esas variables, porque están "clausuradas" con ella,
 * permitiendo la persistencia de datos privados y la creación de comportamientos personalizados.
 */

function counter() {
  let count = 0;

  return () => ++count;
}

const increment = counter();
console.log(increment()); // 1
console.log(increment()); // 2
console.log(increment()); // 3

// Caso real: módulo privado
function createWallet(initialBalance) {
  let balance = initialBalance; // Privado via closure

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) throw new Error('Fondos insuficientes');
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    },
  };
}

// Caso clásico en entrevistas: loop con setTimeout
function crearBotones() {
  const buttons = [];
  for (let i = 0; i < 3; i++) {
    buttons.push(() => console.log(`Botón ${i}`));
  }
  return buttons;
}
