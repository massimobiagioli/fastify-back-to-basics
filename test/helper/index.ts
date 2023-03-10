import {FastifyInstance} from "fastify";
import {LoginResponseType} from "../../src/types/login";

export const loginFactory = (app: FastifyInstance) => async (username: string, password: string) => {
  const response = await app.inject({
    method: 'POST',
    url: '/api/user/login',
    payload: {
      "username": username,
      "password": password,
    }
  })

  const loginInfo = response.json<LoginResponseType>()
  return loginInfo.token
}