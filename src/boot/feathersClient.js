import { boot } from "quasar/wrappers";
import feathersClient from "../api/feathers-client";
import feathersRestClient from '../api/feathers-rest-client';

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$feathersClient = feathersClient;
  app.config.globalProperties.$feathersRestClient = feathersRestClient;
});
