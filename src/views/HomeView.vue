<template>
  <div class="container">
    <div class="flex">
      <h1>Houses</h1>

      <p>Create New</p>
    </div>
    <div class="flex">
      <input placeholder="search for a house" />
      <div><button>Size</button><button>Price</button></div>
    </div>

    <div class="main" v-for="house in houses" :key="house.id">
      <HouseCard :house="house" />
    </div>
  </div>
</template>

<script>
import HouseCard from "@/components/HouseCard.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    HouseCard,
  },
  mounted() {
    this.getHouses();
  },
  data() {
    return {
      houses: [],
      errors: [],
    };
  },
  methods: {
    getHouses() {
      axios
        .get(`https://api.intern.d-tt.nl/api/houses`, {
          headers: {
            "X-Api-Key": process.env.VUE_APP_API_KEY,
          },
        })

        .then((response) => (this.houses = response.data))
        .catch((error) => {
          this.errors.push(error);
          console.log();
        });
    },
  },
};
</script>

<style scoped>
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
</style>
