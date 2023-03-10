import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { SignupRequestType } from '../../../types/signup'

declare module 'fastify' {
  interface FastifyInstance {
    signupFeature: (request: SignupRequestType) => Promise<void>
  }
}

async function signupFeaturePlugin(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  const signupFeature = async (request: SignupRequestType) => {
    const db = fastify.mongo.db
    if (!db) {
      throw new Error('db is undefined')
    }

    const users = db.collection('users')
    request.password = fastify.hashPassword(request.username, request.password)
    await users.insertOne(request)
  }

  fastify.decorate('signupFeature', signupFeature)
}

export default fp(signupFeaturePlugin)
