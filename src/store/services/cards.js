import feathersClient, { apiVuex } from '../../api/feathers-client';

const { makeServicePlugin, BaseModel } = apiVuex;
// import { owndataWrapper } from '@feathersjs-offline/client';

// import {diff} from 'deep-object-diff';

class Cards extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }

  // // Required for $FeathersVuex plugin to work after production transpile.
  // static modelName = 'Cards';

  // static diffOnPatch(data) {
  //   console.log('diffOnPatch data', data);
  //   if (data['_id']) {
  //     const originalObject = Cards.store.state['cards'].keyedById[data['_id']];
  //     const dif = diff(originalObject, data);
  //     console.log('diffOnPatch dif', dif, data);
  //     return diff(originalObject, data);
  //   } else {
  //     return data;
  //   }
  // }

  // Define default properties here
  static instanceDefaults() {
    return {
      name: undefined,
      description: undefined,
      order: 0,
      owners: [],
      priority: undefined,
      category: undefined,
      tags: [],
      parent: undefined,
      children: [],
      card: undefined,
      comments: [],
      createdBy: undefined,
      updatedBy: undefined,
    };
  }
}

Cards.modelName = 'Cards';

const servicePath = 'cards';
const servicePlugin = makeServicePlugin({
  Model: Cards,
  service: feathersClient.service(servicePath),
  servicePath,
  state: {},
  getters: {},
  mutations: {},
  actions: {}
});

// const beforeHook = context => {
//   // eslint-disable-next-line no-console
//   console.log('------------->>>> beforeHook - context.method:', context.method);
//   console.log('------------->>>> beforeHook - context.params:', context.params);
//   console.log('------------->>>> beforeHook - context.data:', context.data);
// };

// owndataWrapper(feathersClient, servicePath, {id: '_id'});

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
});

export default servicePlugin;
