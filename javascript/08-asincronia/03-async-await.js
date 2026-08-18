/**
 * TEMA: async/await
 * ENTREVISTA SENIOR: ¿Qué ocurre internamente con await?
 *
 * async convierte la función en una que retorna Promise.
 * await pausa la ejecución de la función async y delega al Event Loop.
 * El código después de await se convierte en un .then() (microtask).
 */

async function getUserPosts(userId) {
  try {
    const user = await fetchUser(userId);     // Pausa aquí
    const posts = await fetchPosts(user.id);  // Pausa aquí
    return posts;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// Internamente es equivalente a:
function getUserPostsEquivalent(userId) {
  return fetchUser(userId)
    .then((user) => fetchPosts(user.id))
    .catch((error) => {
      console.error('Error:', error.message);
      throw error;
    });
}

// Paralelo vs Secuencial
async function paralelo() {
  const [users, posts] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
  ]);
}

async function secuencial() {
  const users = await fetchUsers();  // Espera
  const posts = await fetchPosts();  // Luego espera
}

// Top-level await (ES modules)
// const data = await fetch('/api/data').then(r => r.json());
