import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { HealthResponse, HealthResponseType } from '../types/health'

export default async function (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  fastify.get<{ Reply: HealthResponseType }>(
    '/health',
    {
      schema: {
        tags: ['Utility'],
        response: {
          200: HealthResponse,
        },
      },
    },
    async (_request, _reply) => {
      return { status: 'ok' }
    },
  )
}
