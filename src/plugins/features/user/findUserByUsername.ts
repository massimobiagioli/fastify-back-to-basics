import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { UserDtoType } from '../../../types/user'

declare module 'fastify' {
  interface FastifyInstance {
    findUserByUsernameFeature: (username: string) => Promise<UserDtoType | null>
  }
}

async function findByUsernameFeaturePlugin(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  const findUserByUsernameFeature = async (
    username: string,
  ): Promise<UserDtoType | null> => {
    const db = fastify.mongo.db
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

  fastify.decorate('findUserByUsernameFeature', findUserByUsernameFeature)
}

export default fp(findByUsernameFeaturePlugin)
