<template>
  <div>
    <input
      type="text"
      placeholder="Search..."
      v-model.trim="input"
      v-on:input="search()"
      ref="input"
    />
  </div>
</template>

<script>
export default {
  //   name: "listSearch",
  data: () => ({ input: "" }),
  methods: {
    search() {
      console.log("search is working", this.input);
    },
    closeSearchBar() {
      this.$store.commit("SET_DISPLAY_SEARCH_LIST", false);
    },
  },
};
</script>

<style></style>
