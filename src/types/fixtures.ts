import { Static, Type } from '@sinclair/typebox'

export const CreateUserRequest = Type.Object(
  {
    email: Type.String({ format: 'email' }),
    username: Type.String(),
    firstname: Type.String(),
    lastname: Type.String(),
    password: Type.String({ minLength: 8 }),
  },
  {
    additionalProperties: false,
  },
)

export type CreateUserRequestType = Partial<Static<typeof CreateUserRequest>>

export type FixturesType = {
  dropUsers: () => Promise<void>
  createUser: (request?: CreateUserRequestType) => Promise<void>
}
