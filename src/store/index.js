import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    houses: [],
    token: null,
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
    getToken: (state) => {
      return state.token;
    },
  },
  mutations: {
    setHouses: function (state, houses) {
      state.houses = houses;
    },
    setToken: function (state, token) {
      state.token = token;
    },
  },
  actions: {
    initializeHouses: function (context) {
      axios
        .get(`https://api.intern.d-tt.nl/api/houses`, {
          headers: {
            "X-Api-Key": context.state.token,
          },
        })
        .then((response) => {
          context.commit("setHouses", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    initializeToken: function (context, payload) {
      const loginData = new FormData();
      loginData.append("email", payload.email);
      loginData.append("name", payload.name);

      axios
        .post("https://api.intern.d-tt.nl/api/register", loginData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const key = response.data.apiKey;
          context.commit("setToken", key);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
  modules: {},
});
