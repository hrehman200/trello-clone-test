import feathersClient, {
  makeServicePlugin,
  BaseModel,
} from '../feathers-client';

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

const servicePathUsers = 'users';
const servicePluginUser = makeServicePlugin({
  Model: User,
  service: feathersClient.service(servicePathUsers),
  servicePathUsers,
  mutations: {},
});

export { User, servicePathUsers, servicePluginUser };
