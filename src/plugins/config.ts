import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fastifyEnv from '@fastify/env'
import { Config } from '../types/config'

async function configPlugin(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  let dotEnvPath = `${__dirname}/../../.env`
  if (process.env.ENV === 'test') {
    dotEnvPath = `${__dirname}/../../.env.test`
  }

  fastify.register(fastifyEnv, {
    dotenv: {
      path: dotEnvPath,
    },
    schema: Config,
  })
}

export default fp(configPlugin)
