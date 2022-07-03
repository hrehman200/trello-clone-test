import feathersClient, {
  makeServicePlugin,
  BaseModel,
} from '../feathers-client';

class List extends BaseModel {
  static modelName = 'List';

  static instanceDefaults() {
    return {
      name: '',
      order: '',
      boardId: '',
      archived: '',
    };
  }
}

const servicePathLists = 'lists';
const servicePluginList = makeServicePlugin({
  Model: List,
  service: feathersClient.service(servicePathLists),
  servicePathLists,
  mutations: {},
});

export { List, servicePathLists, servicePluginList };
