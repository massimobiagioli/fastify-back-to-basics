import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'

async function swaggerPlugin(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  fastify.register(swagger, {
    swagger: {
      info: {
        title: 'Fastify Back to Basics',
        description: 'Fastify Back to Basics Demo Api',
        version: '0.1.0',
      },
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
  })

  fastify.register(swaggerUI)
}

export default fp(swaggerPlugin)
