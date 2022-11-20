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
      <input placeholder="search for a house" v-model.trim="seachText" />

      <div><button>Size</button><button>Price</button></div>
    </div>
    <div v-if="houses.length === 0">Not found</div>
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
      seachText: "",
    };
  },
  computed: {
    houses() {
      const store = useStore();
      const all = store.state.houses;
      if (this.seachText.length > 0) {
        return all.filter((house) => {
          const houseSearchText = house.size + house.location.street;
          return houseSearchText
            .toLowerCase()
            .includes(this.seachText.toLowerCase());
        });
      }
      return all;
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
