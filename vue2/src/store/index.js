import Vue from 'vue';
import Vuex from 'vuex';
// 各種モジュール
import form from '@/store/form/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    form,
  }
});