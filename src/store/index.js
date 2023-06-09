import { createStore } from "vuex";

const store = createStore({
    state:{
        user:{
            data:{
                name: "Gedoni"
            },
            token: null
        }
    },
    getters:{},
    actions:{},
    mutations:{
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            // sessionStorage.removeItem("TOKEN");
          },
    },
    modules:{}
});

export default store;