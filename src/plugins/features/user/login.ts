import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { Db } from 'mongodb'
import { LoginRequestType } from '../../../types/login'

async function loginFeaturePlugin(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  const loginFeature =
    (db: Db | undefined) =>
    async (request: LoginRequestType): Promise<string | null> => {
      if (!db) {
        throw new Error('db is undefined')
      }

      const user = await fastify.findUserByUsernameFeature(request.username)
      if (!user) {
        fastify.log.info(`User ${request.username} not found`)
        return null
      }

      if (
        user.password !==
        fastify.hashPassword(request.username, request.password)
      ) {
        fastify.log.info(`Wrong password for user ${request.username}`)
        return null
      }

      return fastify.jwt.sign(
        { username: request.username },
        { expiresIn: '1h' },
      )
    }

  fastify.decorate('loginFeature', loginFeature(fastify.mongo.db))
}

export default fp(loginFeaturePlugin)
