<template>
  <div class="container">
    <div class="flex1">
      <h2>Houses</h2>
      <router-link to="/newhouse" class="create">
        <span class="material-symbols-outlined small"> add </span>
        <span class="hideInMobile">CREATE NEW </span>
      </router-link>
    </div>
    <div class="flex2">
      <input placeholder="search for a house" v-model.trim="searchText" />

      <div>
        <button @click="sortByPrice">Price</button>
        <button @click="sortBySize">Size</button>
      </div>
    </div>
    <h3 v-if="loadingState">LOADING</h3>
    <h3 v-if="loadingError" style="color: red">
      An error occured: {{ loadingError }}
    </h3>
    <div v-if="houses.length === 0 && !loadingState && !loadingError">
      <div>
        <img src="../assets/no-result-found.webp" />
        <p>Please try another keyword</p>
      </div>
    </div>

    <div class="main" v-for="house in sortedHouses" :key="house.id">
      <HouseCard :house="house" />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import HouseCard from "@/components/HouseCard.vue";
export default {
  mounted() {
    const store = useStore();
    store
      .dispatch("initializeHouses")
      .catch(
        (errorMessage) =>
          (this.loadingError = "Loading content failed:" + errorMessage)
      )
      .finally(() => (this.loadingState = false));
  },
  data: function () {
    return {
      loadingError: null,
      loadingState: true, //Show loading text at the begining
      searchText: "",
      sortBy: "price",
    };
  },
  computed: {
    houses() {
      const store = useStore();
      return store.getters.getBySearchText(this.searchText);
    },
    sortedHouses: function () {
      if (this.sortBy === "price") {
        return [...this.houses].sort((a, b) => a.price - b.price);
      } else {
        return [...this.houses].sort((a, b) => a.size - b.size);
      }
    },
  },
  components: { HouseCard },
  methods: {
    sortByPrice() {
      this.sortBy = "price";
    },
    sortBySize() {
      this.sortBy = "size";
    },
  },
};
</script>

<style scoped>
.container {
  padding: 3% 12%;
}
.main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 10px;
  margin: 20px 50px;
  text-decoration: none;
  color: black;
}
.flex1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 50px;
}
.flex2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 50px;
}
p {
  margin: 10px;
}
.create {
  padding: 5px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  background-color: rgb(223, 88, 9);
  font-weight: bold;
  width: 17%;
  text-decoration: none;
  font-size: 0.9em;
}
button {
  padding: 5px 25px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  background-color: rgb(223, 88, 9);
  font-weight: bold;
  text-decoration: none;
}
input {
  width: 30%;
  padding: 5px 0;
  border-radius: 5px;
  background-color: lightgray;
}

.small {
  font-size: 15px;
}
img {
  width: 50%;
  margin-top: 30px;
}
.column {
  width: 100%;
  margin: 0;
  padding: 0;
}

@media only screen and (max-width: 768px) {
  .hideInMobile {
    display: none;
  }
  .flex2 {
    display: block;
  }
  button {
    width: 50%;
  }
  input {
    width: 100%;
  }
  .create {
    border: none;
    cursor: pointer;
    color: black;
    background-color: transparent;
  }
}
.small {
  font-weight: bolder;
  text-decoration: none;
  font-size: 2em;
}
</style>
