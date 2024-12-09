import { SSTConfig } from 'sst'

import { API } from './stacks/MyStack'

export default {
  config(_input) {
    return {
      name: 'todo-sstv2-sveltekit',
      region: 'ap-northeast-1',
    }
  },
  stacks(app) {
    app.stack(API)
  },
} satisfies SSTConfig
