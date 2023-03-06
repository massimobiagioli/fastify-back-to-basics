import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import {
  LoginRequest,
  LoginRequestType,
  LoginResponse,
} from '../../types/login'

export default async function (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  fastify.post<{ Body: LoginRequestType }>(
    '/login',
    {
      schema: {
        tags: ['User'],
        body: LoginRequest,
        response: {
          200: LoginResponse,
          401: {
            type: 'null',
            description: 'Invalid username or password',
          },
          500: {
            type: 'null',
            description: 'Error logging in user',
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const token = await fastify.loginFeature(request.body)
        if (!token) {
          return reply.code(401).send()
        }
        return { token }
      } catch (error) {
        reply.code(500).send()
      }
    },
  )
}
