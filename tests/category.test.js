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
        .get('/categories')
        .expect(401)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            error: expect.any(String),
          }));
        });
    },
  );

  it(
    'should receive bad request if doesn\'t send required data to create category',
    async () => {
      await request(app)
        .post('/categories')
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
    'should receive bad request if category already exists',
    async () => {
      await request(app)
        .post('/categories')
        .set('authorization', TOKEN)
        .send({
          category_name: 'Computadores',
          category_icon: 'test-icon',
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
    'should create new category and receive successfully message as response',
    async () => {
      await request(app)
        .post('/categories')
        .set('authorization', TOKEN)
        .send({
          category_name: 'Test Category',
          category_icon: 'test-icon',
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
    'should receive array of categories',
    async () => {
      await request(app)
        .get('/categories')
        .set('authorization', TOKEN)
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject({
            categories: expect.arrayContaining([{
              id: expect.any(Number),
              category_name: expect.any(String),
              category_icon: expect.any(String),
              Subcategories: expect.arrayContaining([
                expect.objectContaining({
                  id: expect.any(Number),
                  subcategory_name: expect.any(String),
                }),
              ]),
            }]),
          });
        });
    },
  );

  it(
    'should receive not found if doesn\'t find category by sent id',
    async () => {
      await request(app)
        .get('/categories/250')
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
    'should receive a category object',
    async () => {
      await request(app)
        .get(`/categories/${CATEGORY_ID}`)
        .set('authorization', TOKEN)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            category: expect.any(Object),
          }));
        });
    },
  );

  it(
    'should receive bad request if doesn\'t send category id to update',
    async () => {
      await request(app)
        .put('/categories/')
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
    'should receive bad request if doesn\'t send new data to update category',
    async () => {
      await request(app)
        .put('/categories/250')
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
    'should receive not found if doesn\'t find category with the given id',
    async () => {
      await request(app)
        .put('/categories/250')
        .set('authorization', TOKEN)
        .send({
          category_name: 'Test Name',
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
    'should update category and receive updated category object',
    async () => {
      await request(app)
        .put(`/categories/${CATEGORY_ID}`)
        .set('authorization', TOKEN)
        .send({
          category_name: 'Test Name',
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            updated_category: expect.objectContaining({
              id: expect.any(Number),
              category_name: expect.any(String),
              category_icon: expect.any(String),
            }),
          }));
        });
    },
  );

  it(
    'should receive bad request if doesn\'t send category id to delete',
    async () => {
      await request(app)
        .delete('/categories/')
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
    'should receive not found if doesn\'t find category to delete with given id',
    async () => {
      await request(app)
        .delete('/categories/250')
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
    'should delete category and receive null as response',
    async () => {
      await request(app)
        .delete(`/categories/${CATEGORY_ID}`)
        .set('authorization', TOKEN)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(null);
        });
    },
  );
});
