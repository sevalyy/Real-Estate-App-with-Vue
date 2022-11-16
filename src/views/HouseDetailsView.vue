<template>
  <div class="row">
    <div class="col1">Details {{ id }} KK</div>
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
.row {
  float: left;
  width: 100%;
  display: block;
  height: 600px;
}
.col1 {
  float: left;
  width: 60%;
  display: inline;
  margin-left: 2%;
  margin-right: 2%;
}
.col2 {
  float: left;
  width: 32%;
  display: inline;
  margin-left: 2%;
  margin-right: 2%;
}
</style>
