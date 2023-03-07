import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { LoggedUser, LoggedUserFactory, LoggedUserType } from '../../types/user'
import { DecodedToken } from '../../types/auth'

export default async function (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  fastify.get<{ Reply: LoggedUserType }>(
    '/me',
    {
      onRequest: [fastify.authenticate],
      schema: {
        tags: ['Users'],
        security: [
          {
            apiKey: [],
          },
        ],
        response: {
          200: LoggedUser,
          404: {
            type: 'null',
            description: 'User not found',
          },
          500: {
            type: 'null',
            description: 'Error retrieving user',
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { username } = request.user as DecodedToken
        const user = await fastify.findUserByUsernameFeature(username)
        if (!user) {
          return reply.code(404).send()
        }
        return LoggedUserFactory.fromDto(user)
      } catch (error) {
        request.log.error(error)
        return reply.code(500).send()
      }
    },
  )
}
