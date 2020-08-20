/*
 * @Descripttion: 初始化需要的state
 * @Author: heidous
 * @Date: 2020-07-27 17:38:03
 * @LastEditors: heidous
 * @LastEditTime: 2020-07-28 11:03:37
 */
const state = {
  msg: 'hello world',
  count: 0
};
const mutations = {
  SET_MESSAGE: (state, newMsg) => {
    state.msg = newMsg;
  },
  ADD_COUNT: (state) => {
    state.count++;
  },
  DEL_COUNT: (state) => {
    state.count--;
  }
};
const actions = {
  setMessage({ commit }) {
    commit('SET_MESSAGE');
  },
  addCount({ commit }) {
    const timer = setTimeout(() => {
      commit('ADD_COUNT');
      clearTimeout(timer);
    }, 0);
  },
  delCount({ commit }) {
    const timer = setTimeout(() => {
      commit('DEL_COUNT');
      clearTimeout(timer);
    }, 0);
  }
};
const getters = {
  count: (state) => state.count
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
