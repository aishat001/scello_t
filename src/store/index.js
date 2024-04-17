// store/index.js
import { createStore } from 'vuex';

const BASE_URL = 'https://corniehealth.pythonanywhere.com';
const candidateId = import.meta.env.VITE_CANDIDATE_ID
const store = createStore({
  state: {
    users: [],
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    ACTIVATE_USER(state, userId) {
      const user = state.users.find(user => user.id === userId);
      if (user) {
        user.userStatus = true; 
      }
    },
    MARK_PAID(state, userId) {
      const user = state.users.find(user => user.id === userId);
      if (user) {
        user.paymentStatus = 'Paid'; 
      }
    },
    MARK_UNPAID(state, userId) {
      const user = state.users.find(user => user.id === userId);
      if (user) {
        user.paymentStatus = 'Unpaid'; 
      }
    },
    DELETE_USER(state, userId) {
      state.users = state.users.filter(user => user.id !== userId);
     
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      const response = await fetch(`${BASE_URL}/users/${candidateId}`);
      const users = await response.json();
      commit('SET_USERS', users);
    },
    async activateUser({ commit }, userId) {
      await fetch(`${BASE_URL}/activate-user/${userId}`, { method: 'PATCH' });
      commit('ACTIVATE_USER', userId);
    },
    async markPaid({ commit }, userId) {
      await fetch(`${BASE_URL}/mark-paid/${userId}`, { method: 'PATCH' });
      commit('MARK_PAID', userId);
    },
    async markUnpaid({ commit }, userId) {
      await fetch(`${BASE_URL}/mark-unpaid/${userId}`, { method: 'PATCH' });
      commit('MARK_UNPAID', userId);
    },
    async deleteUser({ commit }, userId) {
      await fetch(`${BASE_URL}/remove-user/${userId}`, { method: 'DELETE' });
      commit('MARK_UNPAID', userId);
    },
  },
});

export default store;
