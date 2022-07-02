import feathersClient, {
  makeServicePlugin,
  BaseModel,
} from '../feathers-client';

class Board extends BaseModel {
  static modelName = 'Board';

  static instanceDefaults() {
    return {
      name: '',
      background: '',
    };
  }
}

const servicePathBoards = 'boards';
const servicePluginBoard = makeServicePlugin({
  Model: Board,
  service: feathersClient.service(servicePathBoards),
  servicePathBoards,
  mutations: {},
});

export { Board, servicePathBoards, servicePluginBoard };
