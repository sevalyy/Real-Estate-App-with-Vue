<template>
  <router-link
    :to="{ name: 'housedetails', params: { id: house.id } }"
    class="main"
  >
    <div class="card" v-if="house">
      <img alt="house photo" :src="house?.image" />
      <div class="info">
        <p class="boldText">{{ house.location?.street }}</p>
        <p>€ {{ house.price }}</p>
        <div class="flex">
          <p class="lightText">{{ house.location?.zip }}</p>
          <p class="lightText">{{ house.location?.city }}</p>
        </div>
        <div class="flex">
          <p>
            <span class="material-symbols-outlined"> bathtub </span
            >{{ house.rooms?.bathrooms }}
          </p>
          <p>
            <span class="material-symbols-outlined"> bed </span
            >{{ house.rooms?.bedrooms }}
          </p>
          <p>
            <span class="material-symbols-outlined"> square </span>
            {{ house.size }}m2
          </p>
        </div>
      </div>
    </div>
  </router-link>
  <div v-if="house.madeByMe" class="flex">
    <p class="tooltip" @click="deleteThisHouse">
      <span class="material-symbols-outlined">delete</span>
      <span class="tooltiptext">Delete this house</span>
    </p>
    <p class="material-symbols-outlined">edit</p>
  </div>
</template>

<script>
export default {
  props: {
    house: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    deleteThisHouse() {
      if (
        confirm(
          "Are you sure you want to delete this listing? This action cannot be undone."
        )
      ) {
        this.$store.dispatch("deleteHouse", this.house.id);
      }
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
  text-decoration: none;
  color: black;
}
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
  padding: 10px;
}
.flex {
  display: flex;
}

p {
  margin: 10px;
}
img {
  height: 150px;
  width: 200px;
}
.boldText {
  font-weight: bolder;
}
.lightText {
  color: lightgray;
}
.info {
  text-align: left;
  font-size: 1vw;
}
.tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 60px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  font-size: 10px;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: -45px;
  left: 25%;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
