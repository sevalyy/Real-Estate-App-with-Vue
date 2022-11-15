<template>
  <div class="main">
    <div class="house">
      <p>image</p>
      <p>infos</p>
    </div>

    <div class="edit">
      <p>delete</p>
      <p>edit</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid gray;
}
.edit {
  display: flex;
}

.house {
  display: flex;
}
p {
  margin: 10px;
}
</style>
