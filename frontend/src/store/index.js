import Vue from 'vue';
import Vuex from 'vuex';
import feathersClient, {
  FeathersVuex,
  makeAuthPlugin,
  makeServicePlugin,
  BaseModel,
} from '../feathers-client';

Vue.use(Vuex);
Vue.use(FeathersVuex);

class User extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'User';

  // Define default properties here
  static instanceDefaults() {
    return {
      username: '',
      password: '',
      displayName: '',
      imageUrl: '',
    };
  }
}

const servicePath = 'users';
const servicePluginUser = makeServicePlugin({
  Model: User,
  service: feathersClient.service(servicePath),
  servicePath,
  mutations: {},
});

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
  plugins: [makeAuthPlugin({ userService: servicePath }), servicePluginUser],
});
