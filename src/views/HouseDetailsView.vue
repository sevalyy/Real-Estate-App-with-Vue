<template>
  <div class="row">
    <router-link class="left" to="/">
      <span class="material-symbols-outlined"> keyboard_backspace </span>
      <span class="hideInMobile">Back to the overview</span>
    </router-link>
  </div>
  <div class="row" v-if="loadingState">Loading.</div>
  <div class="row" v-if="!loadingState && house">
    <div class="col1">
      <div v-if="house.image">
        <img alt="house photo" :src="house.image" class="bigImage" />
      </div>

      <div class="info">
        <h2>{{ house.location?.street }}</h2>
      </div>
      <div class="info">
        <span class="material-symbols-outlined"> location_on </span>
        {{ house.location?.zip }} {{ house.location?.city }}
      </div>
      <div class="info">
        <span class="material-symbols-outlined"> euro_symbol </span>
        {{ house.price }}
        <span class="material-symbols-outlined"> square </span>
        {{ house.size }}
        <span
          ><img alt="brick" src="../assets/brick.png" class="smallicon"
        /></span>
        Build in{{ house.constructionYear }}
      </div>
      <div class="info">
        <span class="material-symbols-outlined"> bed </span
        >{{ house.rooms.bedrooms }}
        <span class="material-symbols-outlined"> bathtub </span
        >{{ house.rooms.bathrooms }}
        <span class="material-symbols-outlined"> garage_home </span>
        {{ house.hasGarage }}
      </div>
      <div class="info">{{ house.description }}</div>
    </div>
    <div class="col2">
      <div>
        <h2>Recommended</h2>
        <div v-for="house in houses.slice(0, 3)" :key="house.id">
          <HouseCard :house="house" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import HouseCard from "@/components/HouseCard.vue";

export default {
  props: ["id"],
  data: function () {
    return {
      loadingState: true, //Show loading text at the begining
    };
  },
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
  components: {
    HouseCard,
  },
  computed: {
    houses: function () {
      const store = useStore();
      return store.getters.getAll();
    },
    house: function () {
      return this.houses.find((h) => h.id == this.id);
    },
  },
};
</script>

<style scoped>
.row {
  float: left;
  width: 100%;
  display: block;
  background-color: rgb(233, 232, 232);
  padding: 25px;
}
.left {
  float: left;
  margin-left: 15%;
  text-decoration: none;
  color: inherit;
  font-weight: bold;
}
.col1 {
  float: left;
  width: 40%;
  margin: 0 0 5% 15%;
  background-color: white;
}
.col2 {
  float: left;
  width: 35%;
  display: inline;
  margin: 0 5% 5% 5%;
}
.bigImage {
  width: 100%;
}
.info {
  padding: 15px;
}

.smallicon {
  height: 25px;
  width: 25px;
}
@media only screen and (max-width: 768px) {
  .hideInMobile {
    display: none;
  }
  .col1 {
    width: 100%;
    margin: 0;
  }
  .col2 {
    width: 100%;
  }
}
</style>
