import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fastifyJwt from '@fastify/jwt'

async function jwtPlugin(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  fastify.register(fastifyJwt, {
    secret: fastify.config.JWT_SECRET,
  })
}

export default fp(jwtPlugin)
