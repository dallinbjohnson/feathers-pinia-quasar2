import { boot } from 'quasar/wrappers';
import createStore from '../stores';

export default boot(({ app }) => {
  app.use(createStore({}));
});


