import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { Db } from 'mongodb'
import { UserDtoType } from '../../../types/user'

async function findByUsernameFeaturePlugin(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  const findByUsernameFeature =
    (db: Db | undefined) =>
    async (username: string): Promise<UserDtoType | null> => {
      if (!db) {
        throw new Error('db is undefined')
      }

      const users = db.collection('users')
      const userDocument = await users.findOne({ username })
      if (!userDocument) {
        return null
      }
      return {
        id: userDocument._id.toString(),
        username: userDocument.username,
        email: userDocument.email,
        firstname: userDocument.firstname,
        lastname: userDocument.lastname,
        password: userDocument.password,
      }
    }

  fastify.decorate(
    'findByUsernameFeature',
    findByUsernameFeature(fastify.mongo.db),
  )
}

export default fp(findByUsernameFeaturePlugin)
