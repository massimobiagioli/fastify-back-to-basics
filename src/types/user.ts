import { Static, Type } from '@sinclair/typebox'

export const UserDto = Type.Object({
  id: Type.String(),
  username: Type.String(),
  email: Type.String({ format: 'email' }),
  firstname: Type.String(),
  lastname: Type.String(),
  password: Type.String(),
})

export type UserDtoType = Static<typeof UserDto>
