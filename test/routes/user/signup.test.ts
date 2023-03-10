import {test} from "tap"
import createApp from "../../../src/app";

test('signup', async t => {
  const app = createApp({
    logger: false,
  })

  t.teardown(() => {
    app.close();
  })
  
  const response = await app.inject({
    method: 'POST',
    url: '/api/user/signup',
    payload: {
      "username": "jack",
      "password": "Password123",
      "firstname": "Jack",
      "lastname": "White",
      "email": "jack.white@email.com"
    }
  })

  t.equal(response.statusCode, 201)
})

test('signup with invalid payload', async t => {
  const app = createApp({
    logger: false,
  })

  t.teardown(() => {
    app.close();
  })
  
  const response = await app.inject({
    method: 'POST',
    url: '/api/user/signup',
    payload: {
      "username": "user",
    }
  })

  t.equal(response.statusCode, 400)
})
