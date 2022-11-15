<template>
  <div class="main">
    <img alt="DTT logo" src="../assets/dtt.png" />
    <router-link to="/">Houses</router-link>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
.main {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.2em;
  padding: 0 90px;
}

img {
  height: 40px;
  width: 40px;
}
nav {
  padding: 20px;
}

nav a {
  font-weight: bold;
  color: #1e1519;
  margin: 0 30px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  font-weight: lighter;
}
</style>
