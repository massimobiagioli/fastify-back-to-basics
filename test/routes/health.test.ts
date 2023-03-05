import {afterEach, test} from "tap"
import {FastifyInstance} from "fastify";
import createApp from "../../src/app";
import {HealthResponseType} from "../../src/types/health";

let app: FastifyInstance;

afterEach(async () => {
    await app.close();
})

test('health', async t => {
    app = createApp()

    const response = await app.inject({
        method: 'GET',
        url: '/api/health',
    })

    const healthResponse = response.json<HealthResponseType>()

    t.equal(response.statusCode, 200, )
    t.equal(healthResponse.status, 'ok')
})
