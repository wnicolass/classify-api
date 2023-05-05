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
const STATUS_ID = process.env.AD_STATUS;
const { AD_ID } = process.env;

describe('User Workflow', () => {
  beforeAll(() => {
    serverConn = server.app.listen(3000);
  });
  afterAll(() => serverConn.close());

  it(
    'should receive unauthorized if don\'t send authorization header',
    async () => {
      await request(app)
        .get('/ads/')
        .expect(401)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            error: expect.any(String),
          }));
        });
    },
  );

  it(
    'should receive array of ads',
    async () => {
      await request(app)
        .get('/ads/')
        .set('authorization', TOKEN)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            ads: expect.any(Array),
          }));
        });
    },
  );

  it(
    'should receive bad request if don\t send status id',
    async () => {
      await request(app)
        .get('/ads/status/')
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
    'should receive not found if status id doesn\'t exist',
    async () => {
      await request(app)
        .get('/ads/status/250')
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
    'should receive array of ads matching the sent status id',
    async () => {
      await request(app)
        .get(`/ads/status/${STATUS_ID}`)
        .set('authorization', TOKEN)
        .expect(200)
        .then((res) => {
          const adsStatusId = res.body.ads.map((ad) => ad.status_id);
          adsStatusId.forEach((adStatus) => expect(adStatus).toBe(+STATUS_ID));
          expect(res.body).toEqual(expect.objectContaining({
            ads: expect.any(Array),
          }));
        });
    },
  );

  it(
    'should receive not found if doesn\'t find ad by id',
    async () => {
      await request(app)
        .get('/ads/250')
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
    'should receive an ad by id',
    async () => {
      await request(app)
        .get(`/ads/${AD_ID}`)
        .set('authorization', TOKEN)
        .expect(200)
        .then((res) => {
          const { ad } = res.body;
          expect(ad.id).toBe(+AD_ID);
          expect(res.body).toEqual(expect.objectContaining({
            ad: expect.any(Object),
          }));
        });
    },
  );

  it(
    'should receive bad request if no data is sent to update',
    async () => {
      await request(app)
        .put(`/ads/${AD_ID}`)
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
    'should receive not found if doesn\'t find ad to update',
    async () => {
      await request(app)
        .put('/ads/250')
        .set('authorization', TOKEN)
        .send({
          ad_description: 'haha',
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
    'should update ad and receive updated ad as response',
    async () => {
      await request(app)
        .put(`/ads/${AD_ID}`)
        .set('authorization', TOKEN)
        .send({
          ad_description: 'haha',
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            ad_description: expect.any(String),
          }));
        });
    },
  );

  it(
    'should receive bad request if doesn\'t send new status id',
    async () => {
      await request(app)
        .patch(`/ads/${AD_ID}`)
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
    'should receive bad request if status id doesn\'t exist',
    async () => {
      await request(app)
        .patch(`/ads/${AD_ID}`)
        .set('authorization', TOKEN)
        .send({
          status_id: 365,
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
    'should receive not found if ad isn\'t found by sent id',
    async () => {
      await request(app)
        .patch('/ads/250')
        .set('authorization', TOKEN)
        .send({
          status_id: 2,
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
    'should receive ok and successfully message',
    async () => {
      await request(app)
        .patch(`/ads/${AD_ID}`)
        .set('authorization', TOKEN)
        .send({
          status_id: 1,
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            msg: expect.any(String),
          }));
        });
    },
  );

  it(
    'should receive not found if doesn\'t find ad to delete',
    async () => {
      await request(app)
        .delete('/ads/250')
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
    'should delete ad and receive ok and null as response',
    async () => {
      await request(app)
        .delete(`/ads/${AD_ID}`)
        .set('authorization', TOKEN)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(null);
        });
    },
  );
});
