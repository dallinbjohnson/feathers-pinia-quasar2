import feathersClient from '../../api/feathers-client';
import { defineStore, BaseModel } from 'feathers-pinia';

// import {/*diff, */lodash} from '@iy4u/common-client-lib';
// const {$lget, $lset} = lodash;

export class Cards extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }

  // // Define default properties here
  // static instanceDefaults(/*data, {models, store}*/) {
  //   return {
  //     email: undefined,
  //     name: undefined,
  //     phone: undefined,
  //     roles: [],
  //     phones: [],
  //     addresses: [],
  //     logins: {
  //       ids: [],
  //       active: undefined
  //     },
  //     settings: {
  //       theme: {
  //         darkMode: undefined,
  //         "--q-color-primary": undefined,
  //         "--q-color-secondary": undefined,
  //         "--q-color-accent": undefined,
  //         "--q-color-dark": undefined,
  //
  //         "--q-color-positive": undefined,
  //         "--q-color-negative": undefined,
  //         "--q-color-info": undefined,
  //         "--q-color-warning": undefined
  //       }
  //     },
  //     createdBy: undefined,
  //     updatedBy: undefined,
  //     createdAt: undefined,
  //     updatedAt: undefined,
  //     avatar: undefined,
  //     banner: undefined,
  //     images: undefined
  //   };
  // }

  // static setupInstance(data, { /*store, */models }) {
  //   if ($lget(data, '_fastjoin.logins.ids', []).length) {
  //     $lset(data, '_fastjoin.logins.ids', $lget(data, '_fastjoin.logins.ids', []).map(account => new models.api.Logins(account)));
  //   }
  //   if ($lget(data, '_fastjoin.logins.active')) {
  //     $lset(data, '_fastjoin.logins.active', new models.api.Logins($lget(data, '_fastjoin.logins.active')));
  //   }
  //
  //   let createdAt = $lget(data, 'createdAt');
  //   if (typeof createdAt === 'string') {
  //     $lset(data, 'createdAt', new Date(createdAt));
  //   }
  //   let updatedAt = $lget(data, 'updatedAt');
  //   if (typeof updatedAt === 'string') {
  //     $lset(data, 'updatedAt', new Date(updatedAt));
  //   }
  //   return data;
  // }
}

const servicePath = 'cards';
const useStore = defineStore({
  Model: Cards,
  servicePath,
  clients: { api: feathersClient },
  idField: '_id',
  state() {
    return {};
  },
  getters: {},
  actions: {},
});

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

export default useStore;
