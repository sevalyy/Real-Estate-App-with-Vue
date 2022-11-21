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
    removeHouse: function (state, id) {
      state.houses = state.houses.filter((h) => h.id !== id);
    },
  },
  actions: {
    initializeHouses: function (context) {
      return new Promise((resolve, reject) => {
        axios
          .get(`https://api.intern.d-tt.nl/api/houses`, {
            headers: {
              "X-Api-Key": process.env.VUE_APP_API_KEY,
            },
          })
          .then((response) => {
            context.commit("setHouses", response.data);
            resolve("OK");
          })
          .catch((error) => {
            let message = error.message ? error.message : JSON.stringify(error);
            reject(message); // show error msg on frontend
          });
      });
    },
    deleteHouse: function (context, id) {
      const config = {
        method: "delete",
        url: "https://api.intern.d-tt.nl/api/houses/" + id,
        headers: {
          "X-Api-Key": process.env.VUE_APP_API_KEY,
        },
      };

      axios(config)
        .then(function () {
          context.commit("removeHouse", id);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  modules: {},
});
