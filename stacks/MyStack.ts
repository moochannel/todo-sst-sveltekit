import { Api, StackContext, SvelteKitSite, Table } from 'sst/constructs'

export function API({ stack }: StackContext) {
  const dynamoDb = new Table(stack, 'todo', {
    fields: {
      id: 'string',
      description: 'string',
      doneAt: 'string',
      createdAt: 'string',
      updatedAt: 'string',
    },
    primaryIndex: { partitionKey: 'id' },
  })

  const api = new Api(stack, 'api', {
    routes: {
      'GET /': 'packages/functions/src/lambda.handler',
    },
  })

  const site = new SvelteKitSite(stack, 'site', {
    path: 'packages/frontend',
    bind: [dynamoDb],
    environment: {
      BACKEND_BASE_URL: api.url,
    },
  })

  stack.addOutputs({
    URL: site.url,
    ApiEndpoint: api.url,
  })
}
