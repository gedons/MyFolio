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
          links: [],
          data: []
        },

        dashboard: {
          loading: false,
          data: {}
        },

        currentProject: {
          data: {},
          loading: false,
        },

        //Admin/blog
        currentBlog: {
          data: {},
          loading: false,
        },
        blogs: {
          loading: false,
          links: [],
          data: []
        },

         notification: {
          show: false,
          type: null,
          message: null
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
          
          getProjects({ commit },  {url = null} = {}) {
            commit('setProjectsLoading', true)
            url = url || "/project";
            return axiosClient.get(url).then((res) => {
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

          getDashboardData({commit}) {
            commit('dashboardLoading', true)
            return axiosClient.get(`/dashboard`)
            .then((res) => {
              commit('dashboardLoading', false)
              commit('setDashboardData', res.data)
              return res;
            })
            .catch(error => {
              commit('dashboardLoading', false)
              return error;
            })
      
          },

          //Admin/blog
          saveBlog({ commit, dispatch }, blog) {
            delete blog.image_url;
       
             let response;
             if (blog.id) {
               response = axiosClient
                 .put(`/blog/${blog.id}`, blog)
                 .then((res) => {
                   commit('setCurrentBlog', res.data)
                   return res;
                 });
             } else {
               response = axiosClient.post("/blog", blog).then((res) => {
                 commit('setCurrentBlog', res.data)
                 return res;
               });
             }
       
             return response;
           },
           
           getBlogs({ commit },  {url = null} = {}) {
             commit('setBlogsLoading', true)
             url = url || "/blog";
             return axiosClient.get(url).then((res) => {
               commit('setBlogsLoading', false)
               commit("setBlogs", res.data);
               return res;
             });
           },
 
           getBlog({ commit }, id) {
             commit("setCurrentBlogLoading", true);
             return axiosClient
               .get(`/blog/${id}`)
               .then((res) => {
                 commit("setCurrentBlog", res.data);
                 commit("setCurrentBlogLoading", false);
                 return res;
               })
               .catch((err) => {
                 commit("setCurrentBlogLoading", false);
                 throw err;
               });
           },
 
           deleteBlog({ dispatch }, id) {
             return axiosClient.delete(`/blog/${id}`)
             .then((res) => {
               dispatch('getBlogs')
               return res;
             });
           },
 

          //front view projects
          getFrontProjects({ commit }) {
           // commit('setProjectsLoading', true)
            return axiosClient.get("/view/projects").then((res) => {
             // commit('setProjectsLoading', false)
              commit("setFrontProjects", res.data);
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
            state.projects.links = projects.meta.links;
            state.projects.data = projects.data;
          },
          notify:(state, {message, type}) =>{
            state.notification.show = true;
            state.notification.type = type;
            state.notification.message = message;
            setTimeout(() => {
              state.notification.show = false;
            }, 3000)
          },

          dashboardLoading: (state, loading) => {
            state.dashboard.loading = loading;
          },
          setDashboardData: (state, data) => {
            state.dashboard.data = data
          },

          //Admin/blog
          setCurrentBlogLoading: (state, loading) => {
            state.currentBlog.loading = loading;
          },
          setCurrentBlog: (state, blog) => {
            state.currentBlog.data = blog.data;
          },

          setBlogsLoading: (state, loading) => {
            state.blogs.loading = loading;
          },
          setBlogs: (state, blogs) => {
            state.blogs.links = blogs.meta.links;
            state.blogs.data = blogs.data;
          },

          //front
          // setFrontBlogs: (state, blogs) => {
          //   state.blogs.data = blogs.data;
          // },

    },
    modules:{}
});

export default store;