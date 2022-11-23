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
    newHouse: function (state, house) {
      state.houses = [house, ...state.houses];
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
    addHouse: function (context, house) {
      const data = new FormData();
      data.append("price", house.price);
      data.append("bedrooms", house.bedrooms);
      data.append("bathrooms", house.bathrooms);
      data.append("size", house.size);
      data.append("streetName", house.streetName);
      data.append("houseNumber", house.houseNumber);
      data.append("numberAddition", house.numberAddition);
      data.append("zip", house.zip);
      data.append("city", house.city);
      data.append("constructionYear", house.constructionYear);
      data.append("hasGarage", house.hasGarage);
      data.append("description", house.description);

      return new Promise((resolve, reject) => {
        axios
          .post("https://api.intern.d-tt.nl/api/houses", data, {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-Api-Key": process.env.VUE_APP_API_KEY,
            },
          })
          .then((response) => {
            //Get the new house from response which contains id, madeByMe
            const createdHouse = response.data;
            if (createdHouse && createdHouse.id) {
              console.log(createdHouse);
              context.commit("newHouse", createdHouse);
              resolve(createdHouse);
            } else {
              reject("Server did not return with success"); // show error msg on frontend
            }
          })
          .catch(function (error) {
            console.log("error in creating house:", error);
            let message = error.message ? error.message : JSON.stringify(error);
            reject(message); // show error msg on frontend
          });
      });
    },
  },
  modules: {},
});
