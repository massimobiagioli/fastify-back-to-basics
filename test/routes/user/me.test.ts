import {test} from "tap"
import createApp from "../../../src/app";
import {LoggedUserType} from "../../../src/types/user";
import {loginFactory} from "../../helper";

test('get logged user info', async t => {
  const app = createApp({
    logger: false,
  })

  t.teardown(() => {
    app.close();
  })
  
  const login = loginFactory(app)
  const token = await login('tester', 'Tester123')

  const response = await app.inject({
    method: 'GET',
    url: '/api/user/me',
    headers: {
      authorization: `Bearer ${token}`
    },
  })

  const loggedUserResponse = response.json<LoggedUserType>()

  t.equal(response.statusCode, 200)
  t.equal(loggedUserResponse.username, 'tester')
  t.equal(loggedUserResponse.email, 'tester@email.com')
  t.equal(loggedUserResponse.firstname, 'FirstName')
  t.equal(loggedUserResponse.lastname, 'LastName')
})

test('cannot retrieve logged user info if not authenticated', async t => {
  const app = createApp({
    logger: false,
  })

  t.teardown(() => {
    app.close();
  })
  
  const response = await app.inject({
    method: 'GET',
    url: '/api/user/me'
  })

  t.equal(response.statusCode, 401)
})

test('cannot retrieve logged user info if bad token provided', async t => {
  const app = createApp({
    logger: false,
  })

  t.teardown(() => {
    app.close();
  })

  const response = await app.inject({
    method: 'GET',
    url: '/api/user/me',
    headers: {
      authorization: `Bearer bad-token`
    },
  })

  t.equal(response.statusCode, 401)
})
