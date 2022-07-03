import Vue from 'vue';
import Vuex from 'vuex';
import {
  FeathersVuex,
  makeAuthPlugin,
} from '../feathers-client';
import { servicePathUsers, servicePluginUser } from './user';
import { servicePluginBoard } from './board';
import { servicePluginList } from './list';
import { servicePluginCard } from './card';

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
  plugins: [
    makeAuthPlugin({ userService: servicePathUsers }),
    servicePluginUser,
    servicePluginBoard,
    servicePluginList,
    servicePluginCard,
  ],
});
