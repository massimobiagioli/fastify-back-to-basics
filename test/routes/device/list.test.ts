import {afterEach, beforeEach, test} from "tap"
import {FastifyInstance} from "fastify";
import createApp from "../../../src/app";
import {loginFactory, LoginFunction} from "../../helper";
import {DeviceDtoCollectionType} from "../../../src/types/device";

let app: FastifyInstance
let login: LoginFunction

beforeEach(async () => {
  app = await createApp({
    logger: false,
  })
  await app.fixtures.load()
  login = loginFactory(app)
})

afterEach(async () => {
  await app.close();
})

test('get all devices', async t => {
  const token = await login('tester', 'Tester123')

  const response = await app.inject({
    method: 'GET',
    url: '/api/device',
    headers: {
      authorization: `Bearer ${token}`
    },
  })

  const deviceCollection = response.json<DeviceDtoCollectionType>()

  t.equal(response.statusCode, 200)
  t.equal(deviceCollection.length, 2)

  t.ok(deviceCollection[0].id)
  t.equal(deviceCollection[0].name, 'Device 1')
  t.equal(deviceCollection[0].address, '10.10.10.1')
  t.equal(deviceCollection[0].isActive, false)

  t.ok(deviceCollection[1].id)
  t.equal(deviceCollection[1].name, 'Device 2')
  t.equal(deviceCollection[1].address, '10.10.10.2')
  t.equal(deviceCollection[1].isActive, false)
})
