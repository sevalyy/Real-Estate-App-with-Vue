<template>
  <div class="container">
    <div class="flex">
      <h2>Houses</h2>

      <router-link to="/newhouse" class="create">
        <span class="material-symbols-outlined small"> add </span>
        CREATE NEW
      </router-link>
    </div>
    <div class="flex">
      <input placeholder="search for a house" v-model.trim="searchText" />

      <div><button>Size</button><button>Price</button></div>
    </div>
    <div v-if="houses.length === 0">
      <div>
        <img src="../assets/no-result-found.webp" />
        <p>Please try another keyword</p>
      </div>
    </div>
    <router-link
      :to="{ name: 'housedetails', params: { id: house.id } }"
      class="main"
      v-for="house in houses"
      :key="house.id"
    >
      <HouseCard :house="house" />
    </router-link>
  </div>
</template>

<script>
import { useStore } from "vuex";
import HouseCard from "@/components/HouseCard.vue";

export default {
  setup() {
    const store = useStore();
    store.dispatch("initializeHouses");
  },

  data: function () {
    return {
      searchText: "",
    };
  },
  computed: {
    houses() {
      const store = useStore();
      return store.getters.getBySearchText(this.searchText);
    },
  },
  components: { HouseCard },
  methods: {},
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
  margin: 20px 50px;
  text-decoration: none;
  color: black;
}
.flex {
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
  width: 40%;
  margin-top: 30px;
}
</style>
