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
const { CATEGORY_ID } = process.env;
const { SUBCATEGORY_ID } = process.env;

describe('JWT Token Workflow', () => {
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
    'should receive unauthorized if doesn\'t send authorization header',
    async () => {
      await request(app)
        .get('/subcategories')
        .expect(401)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            error: expect.any(String),
          }));
        });
    },
  );

  it(
    'should receive bad request if doesn\'t send required data to create subcategory',
    async () => {
      await request(app)
        .post('/subcategories')
        .set('authorization', TOKEN)
        .expect(400)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            error: expect.any(String),
          }));
        });
    },
  );

  it(
    'should receive bad request if subcategory already exists',
    async () => {
      await request(app)
        .post('/subcategories')
        .set('authorization', TOKEN)
        .send({
          subcategory_name: 'Periféricos',
          category_id: CATEGORY_ID,
        })
        .expect(400)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            error: expect.any(String),
          }));
        });
    },
  );

  it(
    'should receive not found if category id sent doesn\'t exist',
    async () => {
      await request(app)
        .post('/subcategories')
        .set('authorization', TOKEN)
        .send({
          subcategory_name: 'Test',
          category_id: 250,
        })
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            error: expect.any(String),
          }));
        });
    },
  );

  it(
    `
    should create new subcategory
    and receive successfully message
     as response
    `,
    async () => {
      await request(app)
        .post('/subcategories')
        .set('authorization', TOKEN)
        .send({
          subcategory_name: 'Test Subcategory',
          category_id: CATEGORY_ID,
        })
        .expect(201)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            msg: expect.any(String),
          }));
        });
    },
  );

  it(
    'should receive array of subcategories',
    async () => {
      await request(app)
        .get('/subcategories')
        .set('authorization', TOKEN)
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject({
            subcategories: expect.arrayContaining([{
              id: expect.any(Number),
              subcategory_name: expect.any(String),
              category: expect.objectContaining({
                id: expect.any(Number),
                category_name: expect.any(String),
              }),
            }]),
          });
        });
    },
  );

  it(
    'should receive not found if doesn\'t find subcategory by sent id',
    async () => {
      await request(app)
        .get('/subcategories/250')
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
    'should receive a subcategory object',
    async () => {
      await request(app)
        .get(`/subcategories/${SUBCATEGORY_ID}`)
        .set('authorization', TOKEN)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            subcategory: expect.any(Object),
          }));
        });
    },
  );

  it(
    'should receive bad request if doesn\'t send subcategory id to update',
    async () => {
      await request(app)
        .put('/subcategories/')
        .set('authorization', TOKEN)
        .expect(400)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            error: expect.any(String),
          }));
        });
    },
  );

  it(
    `
      should receive bad request if
      doesn't send new data to update
      subcategory
    `,
    async () => {
      await request(app)
        .put('/subcategories/250')
        .set('authorization', TOKEN)
        .expect(400)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            error: expect.any(String),
          }));
        });
    },
  );

  it(
    `
      should receive bad request if
      doesn't find category with the
      given id
    `,
    async () => {
      await request(app)
        .put('/subcategories/250')
        .set('authorization', TOKEN)
        .send({
          category_id: 250,
        })
        .expect(400)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            error: expect.any(String),
          }));
        });
    },
  );

  it(
    `
      should receive not found if
      doesn't find subcategory with the
      given id
    `,
    async () => {
      await request(app)
        .put('/subcategories/250')
        .set('authorization', TOKEN)
        .send({
          subcategory_name: 'test',
        })
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            error: expect.any(String),
          }));
        });
    },
  );

  it(
    'should receive bad request if subcategory already exists',
    async () => {
      await request(app)
        .put(`/subcategories/${SUBCATEGORY_ID}`)
        .set('authorization', TOKEN)
        .send({
          subcategory_name: 'Periféricos',
        })
        .expect(400)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            error: expect.any(String),
          }));
        });
    },
  );

  it(
    `
      should update subcategory
      and receive updated subcategory
      object as response
    `,
    async () => {
      await request(app)
        .put(`/subcategories/${SUBCATEGORY_ID}`)
        .set('authorization', TOKEN)
        .send({
          subcategory_name: 'Imagem',
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            updated_subcategory: expect.objectContaining({
              id: expect.any(Number),
              subcategory_name: expect.any(String),
              category_id: expect.any(Number),
            }),
          }));
        });
    },
  );

  it(
    'should receive bad request if doesn\'t send subcategory id to delete',
    async () => {
      await request(app)
        .delete('/subcategories/')
        .set('authorization', TOKEN)
        .expect(400)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            error: expect.any(String),
          }));
        });
    },
  );

  it(
    `
      should receive not found if doesn't
      find subcategory to delete with given id
    `,
    async () => {
      await request(app)
        .delete('/subcategories/250')
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
    'should delete subcategory and receive null as response',
    async () => {
      await request(app)
        .delete('/subcategories/127')
        .set('authorization', TOKEN)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(null);
        });
    },
  );
});
