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
const TOKEN = process.env.TEST_TOKEN;
const { USER_ID } = process.env;

describe('User Workflow', () => {
  beforeAll(() => {
    serverConn = server.app.listen(3000);
  });
  afterAll(() => serverConn.close());

  /*
    this test applies to all endpoints, which means that
    doesn't matter if the http verb used in the request is
    GET, POST, PUT, PATCH or DELETE. All endpoints are
    protected by a middleware that checkes if the current
    admin is logged in.
  */
  it(
    'should receive unauthorized if don\'t send authorization header',
    async () => {
      request(app)
        .get('/users/')
        .expect(401)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            error: expect.any(String),
          }));
        });
    },
  );

  it(
    'should receive array of users',
    async () => {
      await request(app)
        .get('/users/')
        .set('authorization', TOKEN)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            users: expect.arrayContaining([
              expect.any(Object),
            ]),
          }));
        });
    },
  );

  it(
    'should receive not found if no user is found',
    async () => {
      await request(app)
        .get('/users/250')
        .set('authorization', TOKEN)
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            error: expect.any(String),
          }));
        });
    },
  );

  it(
    'should receive an user object',
    async () => {
      await request(app)
        .get(`/users/${USER_ID}`)
        .set('authorization', TOKEN)
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject({
            user: {
              Ads: expect.arrayContaining([
                expect.objectContaining({
                  id: expect.any(Number),
                  title: expect.any(String),
                }),
              ]),
              UserLoginDatum: {
                email_addr: expect.any(String),
              },
              user_id: expect.any(Number),
              username: expect.any(String),
              phone_number: expect.any(String),
              birth_date: expect.any(String),
              last_login: expect.any(String),
              profile_image_url: /^.*|null$/,
              is_active: expect.any(Boolean),
            },
          });
        });
    },
  );

  it(
    'should receive not found if no user is found to update',
    async () => {
      await request(app)
        .put('/users/250')
        .set('authorization', TOKEN)
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            error: expect.any(String),
          }));
        });
    },
  );

  it(
    'should update user and receive user object as response',
    async () => {
      await request(app)
        .put('/users/2')
        .set('authorization', TOKEN)
        .send({
          username: 'Arnalda',
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            user_id: expect.any(Number),
            username: expect.any(String),
          }));
        });
    },
  );

  it(
    'should receive not found if doesn\'t exist user to delete',
    async () => {
      await request(app)
        .delete('/users/250')
        .set('authorization', TOKEN)
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            error: expect.any(String),
          }));
        });
    },
  );

  it(
    'should delete user and receive null as response',
    async () => {
      await request(app)
        .delete('/users/11')
        .set('authorization', TOKEN)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(null);
        });
    },
  );
});
