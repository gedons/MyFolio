import { createStore } from "vuex";
import authAdmin from './modules/authAdmin';

const store = createStore({
  modules: {
    authAdmin,
 
  },
});

export default store;
