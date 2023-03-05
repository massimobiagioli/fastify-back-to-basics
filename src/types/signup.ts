import { Static, Type } from '@sinclair/typebox'

export const SignupRequest = Type.Object({
  email: Type.String({ format: 'email' }),
  firstname: Type.String(),
  lastname: Type.String(),
  password: Type.String({ minLength: 8 }),
})

export type SignupRequestType = Static<typeof SignupRequest>
