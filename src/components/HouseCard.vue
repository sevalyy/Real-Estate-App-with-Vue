<template>
  <div class="card">
    <img alt="house photo" :src="house.image" />
    <div>
      <p>{{ house.location.street }}</p>
      <p>{{ house.location.city }}</p>
      <p>{{ house.price }}</p>

      <p>{{ house.location.zip }}</p>
      <p>bathroom:{{ house.rooms.bathrooms }}</p>
      <p>bedroom:{{ house.rooms.bedrooms }}</p>
    </div>
  </div>

  <div class="edit">
    <p>delete</p>
    <p>edit</p>
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
}
.edit {
  display: flex;
}

p {
  margin: 10px;
}
img {
  height: 150px;
  width: 200px;
}
</style>
