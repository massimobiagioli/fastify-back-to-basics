import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fastifyMongo from '@fastify/mongodb'

async function mongoDbPlugin(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  fastify.register(fastifyMongo, {
    forceClose: true,
    url: fastify.config.MONGO_URI,
  })
}

export default fp(mongoDbPlugin)
