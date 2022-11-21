import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    houses: [],
  },
  getters: {
    getBySearchText: (state) => (searchText) => {
      const all = state.houses;
      if (searchText.length > 0) {
        return all.filter((house) => {
          const houseSearchText =
            house.location.street +
            house.price +
            house.location.zip +
            house.location.city +
            house.size;
          return houseSearchText
            .toLowerCase()
            .includes(searchText.toLowerCase());
        });
      }
      return all;
    },
  },
  mutations: {
    setHouses: function (state, houses) {
      state.houses = houses;
    },
  },
  actions: {
    initializeHouses: function (context) {
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
