import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { SignupRequest, SignupRequestType } from '../../types/signup'

export default async function (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  fastify.post<{ Body: SignupRequestType }>(
    '/signup',
    {
      schema: {
        tags: ['User'],
        body: SignupRequest,
        response: {
          201: {
            type: 'null',
            description: 'User registration successful',
          },
          500: {
            type: 'null',
            description: 'Error registering user',
          },
        },
      },
    },
    async (request, reply) => {
      try {
        await fastify.signupFeature(request.body)
        reply.code(201).send()
      } catch (error) {
        reply.code(500).send()
      }
      await fastify.signupFeature(request.body)
    },
  )
}
