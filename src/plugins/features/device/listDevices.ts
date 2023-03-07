import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { Db } from 'mongodb'
import { DeviceDtoCollectionType } from '../../../types/device'

async function listDevicesFeaturePlugin(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  const listDevicesFeature =
    (db: Db | undefined) => async (): Promise<DeviceDtoCollectionType> => {
      if (!db) {
        throw new Error('db is undefined')
      }

      const devices = db.collection('devices')
      const deviceDocuments = await devices.find().toArray()

      if (!devices) {
        return []
      }
      return deviceDocuments.map((deviceDocument) => {
        return {
          id: deviceDocument._id.toString(),
          name: deviceDocument.name,
          address: deviceDocument.address,
          isActive: deviceDocument.isActive,
        }
      })
    }

  fastify.decorate('listDevicesFeature', listDevicesFeature(fastify.mongo.db))
}

export default fp(listDevicesFeaturePlugin)
