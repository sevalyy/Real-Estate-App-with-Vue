<template>
  <div class="row">
    <router-link class="left" to="/">
      <span class="material-symbols-outlined"> keyboard_backspace </span> Back
      to the overview</router-link
    >
  </div>
  <div class="row">
    <div class="col1">
      <div>
        <img alt="house photo" :src="house.image" class="bigImage" />
      </div>

      <div>
        <h2>{{ house.location.street }}</h2>
      </div>
      <div>
        <span class="material-symbols-outlined"> location_on </span>
        {{ house.location.zip }} {{ house.location.city }}
      </div>
      <div>
        <span class="material-symbols-outlined"> euro_symbol </span>
        {{ house.price }}
        <span class="material-symbols-outlined"> square </span>
        {{ house.size }}
        <span
          ><img alt="brick" src="../assets/brick.png" class="smallicon"
        /></span>
        Build in{{ house.constructionYear }}
      </div>
      <div>
        <span class="material-symbols-outlined"> bed </span
        >{{ house.rooms.bedrooms }}
        <span class="material-symbols-outlined"> bathtub </span
        >{{ house.rooms.bathrooms }}
        <span class="material-symbols-outlined"> garage_home </span>
        {{ house.hasGarage }}
      </div>
      <div>{{ house.description }}</div>
    </div>
    <div v-if="house" class="col2">Recommended {{ house.size }}</div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  props: ["id"],
  setup(props) {
    const store = useStore();
    store.dispatch("initializeHouses");

    const house = computed(() => {
      return store.state.houses.find((h) => h.id == props.id);
    });

    return { house };
  },
};
</script>

<style scoped>
.container {
  background-color: black;
}
.row {
  float: left;
  width: 100%;
  display: block;
  background-color: rgb(233, 232, 232);
  padding: 15px;
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
  margin: 0 5% 5% 15%;
  background-color: white;
}
.col2 {
  float: left;
  width: 20%;
  display: inline;
  margin: 0 15% 5% 5%;
}
.bigImage {
  width: 100%;
}

.smallicon {
  height: 25px;
  width: 25px;
}
</style>
