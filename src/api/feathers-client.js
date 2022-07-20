import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import auth from "@feathersjs/authentication-client";
import io from "socket.io-client";
import { batchClient } from "feathers-batch/client";
import { iff, discard, paramsForServer } from "feathers-hooks-common";

import { setupFeathersPinia } from "feathers-pinia";

if (process.env.DEV) console.log("Code running in development mode");
if (process.env.PROD) console.log("Code running in production mode");
const socket = io(process.env.VUE_APP_FEATHERS_URL || "http://localhost:3030", { transports: ["websocket"] });

// const beforeHook = context => {
//   // eslint-disable-next-line no-console
//   console.log('------------->>>> beforeHook - context.path:', context.path);
//   console.log('------------->>>> beforeHook - context.method:', context.method);
//   console.log('------------->>>> beforeHook - context.params:', context.params);
//   console.log('------------->>>> beforeHook - context.data:', context.data);
//   console.log('------------->>>> beforeHook - context.result:', context.result);
// };

const feathersClient = feathers()
  .configure(socketio(socket, {
    timeout: 10000
  }))
  .configure(auth({
    storage: window.localStorage //default: localStorage if available, MemoryStorage otherwise - The storage to store the access token
    // path: '/authentication', //default: '/authentication' - The path of the authentication service
    // locationKey: 'access_token', //default: 'access_token' - The name of the window hash parameter to parse for an access token from the window.location. Usually used by the oAuth flow.
    // locationErrorKey: 'error', //default: 'error' - The name of the window hash parameter to parse for authentication errors. Usually used by the oAuth flow.
    // jwtStrategy: 'jwt', //default: 'jwt' - The access token authentication strategy
    // storageKey: 'feathers-jwt', //default: 'feathers-jwt' - Key for storing the token in e.g. localStorage
    // header: 'Authorization', //default: 'Authorization' - Name of the accessToken header
    // scheme: 'Bearer', //default: 'Bearer' - The HTTP header scheme
    // Authentication: 'SomeValue', //default: AuthenticationClient - Allows to provide a customized authentication client class
  }))
  .hooks({
    before: {
      all: [
        iff(
          context => ["create", "update", "patch"].includes(context.method),
          discard("__id", "__isTemp")
        ),
        context => {
          context.params = paramsForServer(context.params);
        }
        // beforeHook
      ]
    }
  });

feathersClient.configure(batchClient({
  batchService: "batch",
  exclude: ["authentication"]
}));


export default feathersClient;

export const { defineStore, BaseModel } = setupFeathersPinia({
  clients: { api: feathersClient },
  idField: "_id"
});
