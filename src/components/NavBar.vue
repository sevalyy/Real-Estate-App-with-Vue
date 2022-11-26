<template>
  <div class="main">
    <img alt="DTT logo" src="../assets/dtt.png" class="hideInMobile" />

    <router-link to="/">
      <p class="hideInMobile">Houses</p>
      <span class="material-symbols-outlined showInMobile"> home </span>
    </router-link>

    <router-link to="/about">
      <p class="hideInMobile">About</p>

      <span class="material-symbols-outlined showInMobile"> info </span>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.2em;
  padding: 20px 15%;
  background-color: white;
}

img {
  height: 40px;
  width: 40px;
}
nav {
  padding: 20px;
}

nav a {
  color: #1e1519;
  margin: 0 30px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  font-weight: bolder;
}
.showInMobile {
  display: none;
}
.hideInMobile {
  display: block;
}
@media only screen and (max-width: 768px) {
  .showInMobile {
    display: block;
  }
  .hideInMobile {
    display: none;
  }
  .main {
    justify-content: space-around;
  }
}
</style>
