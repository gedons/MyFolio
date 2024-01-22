import { createStore } from "vuex";
import authUser from './modules/authUser';

const store = createStore({
  modules: {
    authUser,
 
  },
});

export default store;
