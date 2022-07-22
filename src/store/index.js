import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';

// import example from './module-example'

// const servicePlugins = import.meta.glob('./services/*.js', { eager: true });
import cards from './services/cards';
import auth from './store.auth';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
    },
    plugins: [
      // ...Object.values(servicePlugins),
      cards,
      auth,
    ],

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  });

  return Store;
});
