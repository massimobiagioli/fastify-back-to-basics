import fp from 'fastify-plugin'
import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyPluginOptions,
} from 'fastify'
import { Db } from 'mongodb'
import { CreateUserRequestType } from '../../types/fixtures'

async function fixturesPlugin(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  const fixtures = (db: Db | undefined, log: FastifyBaseLogger) => {
    if (!db) {
      throw new Error('db is undefined')
    }

    const users = db.collection('users')
    const devices = db.collection('devices')

    const dropUsers = async () => {
      try {
        await users.drop()
      } catch (error) {
        log.warn(error)
      }
    }

    const createUser = async (request?: CreateUserRequestType) => {
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
    }

    const dropDevices = async () => {
      try {
        await devices.drop()
      } catch (error) {
        log.warn(error)
      }
    }

    const populateDevices = async () => {
      await devices.insertMany([
        {
          name: 'Device 1',
          address: '10.10.10.1',
          isActive: false,
        },
        {
          name: 'Device 2',
          address: '10.10.10.2',
          isActive: false,
        },
      ])
    }

    const load = async () => {
      await dropUsers()
      await createUser()
      await dropDevices()
      await populateDevices()
    }

    return {
      dropUsers,
      createUser,
      dropDevices,
      populateDevices,
      load,
    }
  }

  fastify.decorate('fixtures', fixtures(fastify.mongo.db, fastify.log))
}

export default fp(fixturesPlugin)
