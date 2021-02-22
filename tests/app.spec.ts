import { app } from '../src/app';
import { agent as request } from 'supertest';

describe('App test', () => {
  let firstUserIdTest: string;
  let firstUserBody: { id?: string; email: string; password: string };

  beforeAll(() => {
    firstUserIdTest = '';
    firstUserBody = {
      email: 'paul.ngisiro@email.com',
      password: 'password123',
    };
  });

  it('should always pass', () => {
    expect(true).toBe(true);
  });

  it('should POST /users', async () => {
    const res = await request(app).post('/users').send(firstUserBody);

    expect(res.status).toEqual(201);
    expect(res.body).toBeTruthy();
    expect(res.body.id).toBeTruthy();
    firstUserIdTest = res.body.id;
  });

  it('should /GET /users/:userId', async () => {
    const res = await request(app).get(`/users/${firstUserIdTest}`).send();
    expect(res.status).toEqual(200);
    expect(res.body).toBeTruthy();
    expect(res.body.id).toBeTruthy();
    expect(res.body.email).toEqual(firstUserBody.email);
    expect(res.body.password).toEqual(firstUserBody.password);
    expect(res.body.id).toEqual(firstUserIdTest);
  });

  it('should GET /users', async () => {
    const res = await request(app).get('/users').send();

    expect(res.status).toEqual(200);
    expect(res.body).toBeTruthy();
    expect(res.body.length).toBeGreaterThanOrEqual(0);

    expect(res.body[0].password).toEqual(firstUserBody.password);
    expect(res.body[0].email).toEqual(firstUserBody.email);
    expect(res.body[0].id).toEqual(firstUserIdTest);
  });

  it('should PUT /users/:userId', async () => {
    const email = 'paul.email@mail.com';
    const res = await request(app).put(`/users/${firstUserIdTest}`).send({
      password: firstUserBody.password,
      email,
    });

    expect(res.status).toEqual(204);
  });

  it('should GET /users/:userId to have a new email', async () => {
    const res = await request(app).get(`/users/${firstUserIdTest}`).send();

    expect(res.status).toEqual(200);
    expect(res.body).toBeTruthy();

    expect(res.body.id).toBeTruthy();
    expect(res.body.password).toEqual(firstUserBody.password);
    expect(res.body.email).toEqual('paul.email@mail.com');
    expect(res.body.id).toEqual(firstUserIdTest);
  });

  xit('should PATCH /users/:userId', async () => {
    let newField = { description: 'My user description' };
    const res = await request(app)
      .patch(`/users/${firstUserIdTest}`)
      .send(newField);

    expect(res.status).toEqual(204);
  });

  xit('should GET /users/:userId to have a new field called description', async () => {
    const res = await request(app).get(`/users/${firstUserIdTest}`).send();

    expect(res.status).toEqual(200);
    expect(res.body).toBeTruthy();
    expect(res.body.id).toBeTruthy();
    expect(res.body.description).toEqual('My user description');
  });

  it('should DELETE /users/:userId', async () => {
    const res = await request(app).delete(`/users/${firstUserIdTest}`).send();
    expect(res.status).toEqual(204);
  });

  it('should GET /users', async () => {
    const res = await request(app).get('/users').send();

    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(0);
  });
});
