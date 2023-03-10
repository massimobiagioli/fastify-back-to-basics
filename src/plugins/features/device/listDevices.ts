import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { DeviceDtoCollectionType } from '../../../types/device'

declare module 'fastify' {
  interface FastifyInstance {
    listDevicesFeature: () => Promise<DeviceDtoCollectionType>
  }
}

async function listDevicesFeaturePlugin(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  const listDevicesFeature = async (): Promise<DeviceDtoCollectionType> => {
    const db = fastify.mongo.db
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

  fastify.decorate('listDevicesFeature', listDevicesFeature)
}

export default fp(listDevicesFeaturePlugin)
