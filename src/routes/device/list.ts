import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import {
  DeviceDtoCollection,
  DeviceDtoCollectionType,
} from '../../types/device'

export default async function (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  fastify.get<{ Reply: DeviceDtoCollectionType }>(
    '/',
    {
      onRequest: [fastify.authenticate],
      schema: {
        tags: ['Devices'],
        security: [
          {
            apiKey: [],
          },
        ],
        response: {
          200: DeviceDtoCollection,
          500: {
            type: 'null',
            description: 'Error retrieving devices',
          },
        },
      },
    },
    async (request, reply) => {
      try {
        return await fastify.listDevicesFeature()
      } catch (error) {
        request.log.error(error)
        return reply.code(500).send()
      }
    },
  )
}
