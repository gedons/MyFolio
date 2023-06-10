import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state:{
        user:{
            data:{},
            token: sessionStorage.getItem("TOKEN")
        },
        projects: {
          loading: false,
          // links: [],
          data: []
        },

        currentProject: {
          data: {},
          loading: false,
        },
    },
    getters:{},
    actions:{
        login({commit}, user) {
            return axiosClient.post('/login', user)
              .then(({data}) => {
                commit('setUser', data);
                // commit('setToken', data.token)
                return data;
              })
          },
          logout({commit}) {
            return axiosClient.post('/logout')
              .then(response => {
                commit('logout')
                return response;
              })
          },
          saveProject({ commit, dispatch }, project) {
           delete project.image_url;
      
            let response;
            if (project.id) {
              response = axiosClient
                .put(`/project/${project.id}`, project)
                .then((res) => {
                  commit('setCurrentProject', res.data)
                  return res;
                });
            } else {
              response = axiosClient.post("/project", project).then((res) => {
                commit('setCurrentProject', res.data)
                return res;
              });
            }
      
            return response;
          },
          
          getProjects({ commit }) {
            commit('setProjectsLoading', true)
            return axiosClient.get("/project").then((res) => {
              commit('setProjectsLoading', false)
              commit("setProjects", res.data);
              return res;
            });
          },

          getProject({ commit }, id) {
            commit("setCurrentProjectLoading", true);
            return axiosClient
              .get(`/project/${id}`)
              .then((res) => {
                commit("setCurrentProject", res.data);
                commit("setCurrentProjectLoading", false);
                return res;
              })
              .catch((err) => {
                commit("setCurrentProjectLoading", false);
                throw err;
              });
          },

          deleteProject({ dispatch }, id) {
            return axiosClient.delete(`/project/${id}`)
            .then((res) => {
              dispatch('getProjects')
              return res;
            });
          },
    },
    mutations:{
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            sessionStorage.removeItem("TOKEN");
          },
      
          setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token);
          },
          
          setCurrentProjectLoading: (state, loading) => {
            state.currentProject.loading = loading;
          },
          setCurrentProject: (state, project) => {
            state.currentProject.data = project.data;
          },

          setProjectsLoading: (state, loading) => {
            state.projects.loading = loading;
          },
          setProjects: (state, projects) => {
            //state.projects.links = projects.meta.links;
            state.projects.data = projects.data;
          },

    },
    modules:{}
});

export default store;