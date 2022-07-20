import { boot } from "quasar/wrappers";
import feathersClient from "../api/feathers-client";
import feathersRestClient from '../api/feathers-rest-client';

import { setupFeathersPinia } from "feathers-pinia";

export default boot(({ app }) => {
  setupFeathersPinia({
    clients: { api: feathersClient },
    idField: "_id"
  });

  app.config.globalProperties.$feathersClient = feathersClient;
  app.config.globalProperties.$feathersRestClient = feathersRestClient;
});
