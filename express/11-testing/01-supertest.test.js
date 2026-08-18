/**
 * TEMA: Testing con Supertest
 * ENTREVISTA: ¿Cómo testear endpoints Express sin levantar el servidor?
 *
 * Supertest envía requests HTTP al app Express directamente.
 */

const request = require('supertest');
// const app = require('../app');

describe('Users API', () => {
  // beforeAll(async () => { await setupTestDB(); });
  // afterAll(async () => { await teardownTestDB(); });

  it('GET /api/users retorna lista paginada', async () => {
    // const res = await request(app).get('/api/users');

    // expect(res.status).toBe(200);
    // expect(res.body).toHaveProperty('data');
    // expect(res.body).toHaveProperty('meta');
    // expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /api/users sin token retorna 401', async () => {
    // const res = await request(app)
    //   .post('/api/users')
    //   .send({ name: 'Test', email: 'test@test.com' });

    // expect(res.status).toBe(401);
  });

  it('POST /api/users con datos inválidos retorna 422', async () => {
    // const res = await request(app)
    //   .post('/api/users')
    //   .set('Authorization', 'Bearer valid-token')
    //   .send({ name: '', email: 'invalid' });

    // expect(res.status).toBe(422);
    // expect(res.body.details).toBeDefined();
  });

  it('GET /api/users/:id inexistente retorna 404', async () => {
    // const res = await request(app)
    //   .get('/api/users/99999')
    //   .set('Authorization', 'Bearer valid-token');

    // expect(res.status).toBe(404);
  });
});

// Tips testing Express:
// - Mock services, no la BD real (jest.mock('../services/userService'))
// - Test DB separada o in-memory (sqlite)
// - Factory functions para crear datos de test
// - Testear middleware aisladamente con req/res mock

module.exports = {};
