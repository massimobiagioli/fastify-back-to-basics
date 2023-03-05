import fastify, { FastifyInstance } from 'fastify'
import autoload from '@fastify/autoload'
import { join } from 'path'
import { ConfigType } from './types/config'
import { SignupRequestType } from './types/signup'

declare module 'fastify' {
  interface FastifyInstance {
    config: ConfigType

    signupFeature: (request: SignupRequestType) => Promise<any>
  }
}

export default function createApp(): FastifyInstance {
  const app = fastify()

  app.register(autoload, {
    dir: join(__dirname, 'plugins'),
  })

  app.register(autoload, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api' },
  })

  return app
}
