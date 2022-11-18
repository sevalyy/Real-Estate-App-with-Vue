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
      <!-- <input placeholder="search for a house" /> -->

      <SearchBar v-if="DISPLAY_SEARCH_LIST" />
      <button @click.prevent="toggleSearchList()">Search for a House</button>
      <div><button>Size</button><button>Price</button></div>
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
import { computed } from "vue";
import { mapGetters } from "vuex";
import HouseCard from "@/components/HouseCard.vue";
import SearchBar from "../components/SearchBar.vue";
export default {
  setup() {
    const store = useStore();
    store.dispatch("initializeHouses");

    const houses = computed(() => {
      return store.state.houses;
    });

    return { houses };
  },
  components: { HouseCard, SearchBar },
  computed: {
    // use getters first
    ...mapGetters(["DISPLAY_SEARCH_LIST"]),
  },
  methods: {
    // set the list with this methode
    toggleSearchList() {
      this.$store.commit("SET_DISPLAY_SEARCH_LIST", !this.DISPLAY_SEARCH_LIST);
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
</style>
