import feathersClient, {
  makeServicePlugin,
  BaseModel,
} from '../feathers-client';

class Card extends BaseModel {
  static modelName = 'Card';

  static instanceDefaults() {
    return {
      title: '',
      order: 0,
      achived: false,
      boardId: '',
      listId: '',
      members: [],
    };
  }
}

const servicePathCards = 'cards';
const servicePluginCard = makeServicePlugin({
  Model: Card,
  service: feathersClient.service(servicePathCards),
  servicePathCards,
  mutations: {},
});

export { Card, servicePathCards, servicePluginCard };
