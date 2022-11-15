<template>
  <div class="container">
    <input />
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
.container {
  background-color: rgb(194, 192, 192);
}
.main {
  display: flex;
  align-items: center;
  background-color: white;
  width: 70%;
  margin: 20px 50px;
}
.edit {
  display: flex;
}

.house {
  display: flex;
}
p {
  margin: 10px;
}
</style>
