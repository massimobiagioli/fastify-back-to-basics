import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import autoload from '@fastify/autoload'
import { join } from 'path'
import { ConfigType } from './types/config'
import { SignupRequestType } from './types/signup'
import { LoginRequestType } from './types/login'
import { UserDtoType } from './types/user'
import { FixturesType } from './types/fixtures'
import { AuthenticateFunction } from './types/auth'

declare module 'fastify' {
  interface FastifyInstance {
    config: ConfigType
    hashPassword: (username: string, password: string) => string
    authenticate: AuthenticateFunction
    signupFeature: (request: SignupRequestType) => Promise<void>
    loginFeature: (request: LoginRequestType) => Promise<string>
    findUserByUsernameFeature: (username: string) => Promise<UserDtoType | null>
    fixtures: FixturesType
  }
}

export default function createApp(
  opts?: FastifyServerOptions,
): FastifyInstance {
  const defaultOptions = {
    logger: true,
  }

  const app = fastify({ ...defaultOptions, ...opts })

  app.register(autoload, {
    dir: join(__dirname, 'plugins'),
  })

  app.register(autoload, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api' },
  })

  return app
}
