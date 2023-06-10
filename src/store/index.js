import { createStore } from "vuex";
import axiosClient from "../axios";


const tempProjects = [
  {
    id: 1,
    title: "Eccomerce Website",
    slug: "eccomerce-website",
    status: "draft",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    description: "An Eccomerce Website Built With Laravel, VueJs And MySql.",
    created_at: "2023-06-09 8:22:58",
    updated_at: "2023-06-09 8:50:58",

  },
  {
    id: 2,
    title: "Ai Bot",
    slug: "ai-bot",
    status: "draft",
    image: "https://plus.unsplash.com/premium_photo-1682464883182-948b0f493704?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    description: "An Artificial Intelligence bot built with vertex Ai and Python.",
    created_at: "2023-06-09 8:22:58",
    updated_at: "2023-06-09 8:50:58",

  },
  {
    id: 3,
    title: "Betting App",
    slug: "betting-bappot",
    status: "draft",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29jY2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    description: "A sport betting application built with Python Django.",
    created_at: "2023-06-09 8:22:58",
    updated_at: "2023-06-09 8:50:58",

  },
];

const store = createStore({
    state:{
        user:{
            data:{},
            token: sessionStorage.getItem("TOKEN")
        },
        projects: [...tempProjects],
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
    },
    modules:{}
});

export default store;