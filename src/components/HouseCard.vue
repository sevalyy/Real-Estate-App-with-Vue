<template>
  <div class="card">
    <img alt="house photo" :src="house.image" />
    <div class="info">
      <p class="boldText">{{ house.location.street }}</p>
      <p>€ {{ house.price }}</p>
      <div class="flex">
        <p class="lightText">{{ house.location.zip }}</p>
        <p class="lightText">{{ house.location.city }}</p>
      </div>
      <div class="flex">
        <p>
          <span class="material-symbols-outlined"> bathtub </span
          >{{ house.rooms.bathrooms }}
        </p>
        <p>
          <span class="material-symbols-outlined"> bed </span
          >{{ house.rooms.bedrooms }}
        </p>
        <p>
          <span class="material-symbols-outlined"> square </span>
          {{ house.size }}m2
        </p>
      </div>
    </div>
  </div>

  <div v-if="house.madeByMe">
    <span class="material-symbols-outlined"> delete </span>
    <span class="material-symbols-outlined"> edit </span>
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
};
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 40px;
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
}
</style>
