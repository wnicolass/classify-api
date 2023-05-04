import request from 'supertest';
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
} from '@jest/globals';
import { default as server } from '../app';

const { app } = server;
let serverConn = {};

describe('JWT Token Workflow', () => {
  beforeAll(() => {
    serverConn = server.app.listen(3000);
  });
  afterAll(() => serverConn.close());

  it(
    'should receive bad request if dont send email and password',
    () => request(app)
      .post('/token')
      .expect('Content-Type', /application\/json/g)
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual(expect.objectContaining({
          error: expect.any(String),
        }));
      }),
  );

  it(
    'should receive not found if don\'t find admin by email',
    async () => {
      await request(app)
        .post('/token')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
          email: 'john@doe.com',
          password: 'test',
        }))
        .expect('Content-Type', /application\/json/g)
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            error: expect.any(String),
          }));
        });
    },
  );

  it(
    'should receive unauthorized if password isn\'t valid',
    async () => {
      await request(app)
        .post('/token')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
          email: process.env.AUTH_EMAIL,
          password: 'test',
        }))
        .expect('Content-Type', /application\/json/g)
        .expect(401)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            error: expect.any(String),
          }));
        });
    },
  );

  it(
    'should receive token if password matches',
    async () => {
      await request(app)
        .post('/token')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
          email: process.env.AUTH_EMAIL,
          password: process.env.AUTH_PASSWORD,
        }))
        .expect('Content-Type', /application\/json/g)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            token: expect.any(String),
          }));
        });
    },
  );
});
