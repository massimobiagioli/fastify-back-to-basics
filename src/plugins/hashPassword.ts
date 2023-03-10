import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import crypto from 'crypto'

declare module 'fastify' {
  interface FastifyInstance {
    hashPassword: (username: string, password: string) => string
  }
}

async function hashPasswordPlugin(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  const hashPassword =
    (salt: string) =>
    (username: string, password: string): string => {
      const passwordSalt = crypto
        .createHash('sha256')
        .update(username + salt)
        .digest('base64')
      const input = password + passwordSalt
      return crypto.createHash('sha256').update(input).digest('base64')
    }

  fastify.decorate(
    'hashPassword',
    hashPassword(fastify.config.HASHED_PASSWORD_SALT),
  )
}

export default fp(hashPasswordPlugin)
