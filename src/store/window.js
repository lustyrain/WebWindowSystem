import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import menu from '../../config/menu.json';

import secret from '../../config/secret.json';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    windows: [],
    menu,
    apps: {},
    homePosition: {
      x: 100,
      y: 100
    },
    saveServer: {
      host: secret.saveServer.host
    },
    moveWindowPosition: {
      x: 0,
      y: 0
    },
    mouseDownPosition: {
      x: 0,
      y: 0
    },
    isMoveWindow: false,
  },
  mutations: {
    addWindow(state, windowData) {
      windowData.id = state.windows.length;
      state.windows.push(windowData);
    },
    setWindowData(state, windowData) {
      state.windows.forEach((data, index) => {
        if (data.id === windowData.id) {
          state.windows[index].windowData = windowData.windowData;
        }
      });
    },
    setWindow(state, windowData) {
      const setWindowData = [];
      if (windowData.windows.length > 0) {
        windowData.windows.forEach((data, index) => {
          data.id = index;
          setWindowData.push(data);
        });
        state.windows = setWindowData;
      }
      state.apps = {};
      if (windowData.hasOwnProperty('apps')) {
        state.apps = windowData.apps;
      }
    },
    setAppData(state, option) {
      state.apps[option.id] = option.data;
    },
    setMovePosition(state, position) {
      state.moveWindowPosition = position;
    },
    setIsMoveWindow(state, positionData){
      state.isMoveWindow = true;
      state.mouseDownPosition = positionData.windowMouseDown;
      state.moveWindowPosition = positionData.mousePosition;
    },
    unsetIsMoveWindow(state) {
      state.isMoveWindow = false;
    }
  },
  actions: {
    async getWindowDataAction({state, commit}) {
      const windowData = await axios.get(state.saveServer.host + "get", {});
      commit("setWindow", windowData.data);
    },
    async postWindowData({state}) {
      const windows = state.windows;
      const menuList = state.menu;
      const apps = state.apps;
      const params = new URLSearchParams();
      params.append('data', JSON.stringify({windows: windows, menu: menuList, apps: apps}));
      await axios.post(state.saveServer.host + "save", params);
    },
    async removeWindow({state, dispatch}, windowId) {
      state.windows.forEach((data, index) => {
        if (data.id === windowId) {
          state = state.windows.splice(index, 1);
        }
      })
      dispatch("postWindowData");
    },
    async saveAppData({dispatch, commit}, option) {
      commit("setAppData", option);
      dispatch("postWindowData");
    },
    async addWindow({dispatch, commit}, windowData) {
      commit('addWindow', windowData);
      dispatch("postWindowData")
    },
    async saveWindowData({dispatch, commit}, windowData) {
      commit('setWindowData', windowData);
      dispatch('postWindowData');
    }
  },
  modules: {},
  getters: {
    windows: (state, getters) => {
      return state.windows;
    },
    menuList: (state) => {
      return state.menu;
    },
    getMoveWindowPosition: (state) => {
      return {
        x: state.moveWindowPosition.x - state.mouseDownPosition.x,
        y: state.moveWindowPosition.y - state.mouseDownPosition.y
      }
    },
    isMoveWindow: (state) => {
      return state.isMoveWindow;
    },
    countHomePosition(state) {
      const windows = state.windows;
      let checkPosition = [];
      windows.forEach((value, index) => {
        checkPosition.push({x: state.homePosition.x + (22 * index), y: state.homePosition.y + (22 * index)});
      })
      let count = 0;
      windows.forEach((value) => {
        const windowData = value.windowData;
        checkPosition.forEach((value) => {
          if (windowData.top === value.y && windowData.left === value.x) {
            count++;
          }
        })
      })
      return count;
    },
    getWindowPosition(state, getters) {
      const count = getters.countHomePosition;
      return {x: state.homePosition.x + (22 * count), y: state.homePosition.y + (22 * count)}
    },
    getAppData: (state) => (id) => {
      if (state.apps.hasOwnProperty(id)) {
        return state.apps[id];
      }
      return [];
    }
  }
})
