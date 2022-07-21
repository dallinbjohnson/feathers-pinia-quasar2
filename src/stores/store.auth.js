import { defineAuthStore } from 'feathers-pinia';
import feathersClient from '../api/feathers-client';

import { Users } from './services/users.js';

// import {lodash} from '@iy4u/common-client-lib';
// const {$lget} = lodash;

export default defineAuthStore({
  feathersClient,
  userService: 'users',
  state: {
    userId: null,
    // rules: [],
    // logins: [],
    // activeLogin: {},
    // accounts: [],
    // activeAccount: {},
  },
  getters: {
    user() {
      return this.userId ? Users.getFromStore(this.userId) : null;
    },

    // activeLogin(state, getters, rootState) {
    //   if (!state.activeLogin) {
    //     return null;
    //   }
    //   const {idField} = rootState['logins'];
    //   const loginId = state.activeLogin[idField];
    //   return rootState['logins'].keyedById[loginId] || null;
    // },
    // activeAccount(state, getters, rootState) {
    //   if (!state.activeAccount) {
    //     return null;
    //   }
    //   const {idField} = rootState['accounts'];
    //   const accountId = state.activeAccount[idField];
    //   return rootState['accounts'].keyedById[accountId] || null;
    // },
  },
  // mutations: {
  //   setUser(state, payload) {
  //     state.user = payload;
  //     state.rules = $lget(payload, '_fastjoin.rules', []);
  //     state.logins = $lget(payload, '_fastjoin.logins.ids', []).map(login => new models.api.Logins(login));
  //     let login = $lget(payload, '_fastjoin.logins.active', state.logins[0] || undefined);
  //     state.activeLogin = login ? new models.api.Logins(login) : login;
  //     state.accounts = $lget(state.activeLogin, '_fastjoin.accounts.owns.ids', []).map(account => new models.api.Accounts(account));
  //     let account = $lget(state.activeLogin, '_fastjoin.accounts.owns.active', state.accounts[0] || undefined);
  //     state.activeAccount = account ? new models.api.Accounts(account) : account;
  //   },
  //   setActiveAccount(state, payload) {
  //     state.activeAccount = new models.api.Accounts(payload);
  //   },
  // },
  actions: {
    handleResponse(response) {
      this.userId = response.user.id || response.user._id;
      Users.addToStore(response.user);
      return response;
    },
  },
});
