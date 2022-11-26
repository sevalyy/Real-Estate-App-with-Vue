<template>
  <nav class="normal fixed-nav-bar">
    <NavBar />
  </nav>
  <router-view class="forFixed" />
  <nav class="sticky">
    <NavBar />
  </nav>
</template>
<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(233, 232, 232);
  min-height: 100vh;
}
.fixed-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
}
.forFixed {
  margin-top: 65px;
}

.sticky {
  display: none;
}

@media only screen and (max-width: 768px) {
  .normal {
    display: none;
  }
  .sticky {
    display: block;
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    align-self: flex-start;
  }
}
</style>
