import { ApiHandler } from 'sst/node/api'

// eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
export const handler = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: `Hello world. The time is ${new Date().toISOString()}`,
  }
})
