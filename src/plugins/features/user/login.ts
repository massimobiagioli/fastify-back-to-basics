import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { LoginRequestType } from '../../../types/login'

declare module 'fastify' {
  interface FastifyInstance {
    loginFeature: (request: LoginRequestType) => Promise<string>
  }
}

async function loginFeaturePlugin(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  const loginFeature = async (
    request: LoginRequestType,
  ): Promise<string | null> => {
    const db = fastify.mongo.db
    if (!db) {
      throw new Error('db is undefined')
    }

    const user = await fastify.findUserByUsernameFeature(request.username)
    if (!user) {
      fastify.log.info(`User ${request.username} not found`)
      return null
    }

    if (
      user.password !== fastify.hashPassword(request.username, request.password)
    ) {
      fastify.log.info(`Wrong password for user ${request.username}`)
      return null
    }

    return fastify.jwt.sign({ username: request.username }, { expiresIn: '1h' })
  }

  fastify.decorate('loginFeature', loginFeature)
}

export default fp(loginFeaturePlugin)
