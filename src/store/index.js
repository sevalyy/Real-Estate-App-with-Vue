import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    houses: [],
  },
  getters: {},
  mutations: {
    setHouses(state, houses) {
      state.houses = houses;
    },
  },
  actions: {
    initializeHouses(context) {
      axios
        .get(`https://api.intern.d-tt.nl/api/houses`, {
          headers: {
            "X-Api-Key": process.env.VUE_APP_API_KEY,
          },
        })
        .then((response) => {
          context.commit("setHouses", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
});
