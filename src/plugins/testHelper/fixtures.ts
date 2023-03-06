import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { Db } from 'mongodb'
import { CreateUserRequestType } from '../../types/fixtures'

async function fixturesPlugin(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  const fixtures = (db: Db | undefined) => {
    if (!db) {
      throw new Error('db is undefined')
    }

    const users = db.collection('users')

    return {
      dropUsers: async () => {
        await users.drop()
      },
      createUser: async (request?: CreateUserRequestType) => {
        const defaultCreateUserData = {
          username: 'tester',
          password: 'Tester123',
          firstname: 'FirstName',
          lastname: 'LastName',
          email: 'tester@email.com',
        }
        const userData = { ...defaultCreateUserData, ...request }
        userData.password = fastify.hashPassword(
          userData.username,
          userData.password,
        )
        await users.insertOne(userData)
      },
    }
  }

  fastify.decorate('fixtures', fixtures(fastify.mongo.db))
}

export default fp(fixturesPlugin)
