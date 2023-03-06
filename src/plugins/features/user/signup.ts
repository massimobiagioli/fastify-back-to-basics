import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { Db } from 'mongodb'
import { SignupRequestType } from '../../../types/signup'

async function signupFeaturePlugin(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  const signupFeature = (db: Db | undefined) => {
    return async (request: SignupRequestType) => {
      if (!db) {
        throw new Error('db is undefined')
      }

      const users = db.collection('users')
      request.password = fastify.hashPassword(request.email, request.password)
      await users.insertOne(request)
    }
  }

  fastify.decorate('signupFeature', signupFeature(fastify.mongo.db))
}

export default fp(signupFeaturePlugin)
