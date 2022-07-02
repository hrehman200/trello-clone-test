import Vue from 'vue';
import Vuex from 'vuex';
import {
  FeathersVuex,
  makeAuthPlugin,
} from '../feathers-client';
import { servicePathUsers, servicePluginUser } from './user';
import { Board, servicePathBoards, servicePluginBoard } from './board';

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
  ],
});
