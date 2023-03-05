import {afterEach, test} from "tap"
import {FastifyInstance} from "fastify";
import createApp from "../../../src/app";

let app: FastifyInstance;

afterEach(async () => {
    await app.close();
})

test('signup', async t => {
    app = createApp()

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
    app = createApp()

    const response = await app.inject({
        method: 'POST',
        url: '/api/user/signup',
        payload: {
            "username": "user",
        }
    })

    t.equal(response.statusCode, 400)
})
