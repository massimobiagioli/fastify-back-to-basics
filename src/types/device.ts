import { Static, Type } from '@sinclair/typebox'

export const DeviceDto = Type.Object({
  id: Type.String(),
  name: Type.String(),
  address: Type.String({ format: 'ipv4' }),
  isActive: Type.Boolean(),
})

export type DeviceDtoType = Static<typeof DeviceDto>

export const DeviceDtoCollection = Type.Array(DeviceDto)

export type DeviceDtoCollectionType = Static<typeof DeviceDtoCollection>
