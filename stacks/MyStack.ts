import { Api, StackContext, SvelteKitSite } from 'sst/constructs'

export function API({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    routes: {
      'GET /': 'packages/functions/src/lambda.handler',
    },
  })

  const site = new SvelteKitSite(stack, 'site', {
    path: 'packages/frontend',
    environment: {
      DATABASE_URL: process.env.DATABASE_URL || '',
      BACKEND_BASE_URL: api.url,
    },
  })

  stack.addOutputs({
    URL: site.url,
    ApiEndpoint: api.url,
  })
}
