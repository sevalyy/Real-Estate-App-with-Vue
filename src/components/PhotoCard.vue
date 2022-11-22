<template>
  <div id="preview">
    <img v-if="item.imageUrl" :src="item.imageUrl" />
    <p v-if="item.imageUrl">Succesfully uploaded!</p>
  </div>
  <input type="file" accept="image/*" @change="onChange" />
</template>

<script>
export default {
  data() {
    return {
      item: {
        image: null,
        imageUrl: null,
      },
    };
  },
  methods: {
    onChange(e) {
      const file = e.target.files[0];
      this.image = file;
      this.item.imageUrl = URL.createObjectURL(file);
    },
  },
  // methods: {
  //   uploadImage(event) {
  //     let data = new FormData();
  //     data.append("name", "my-picture");
  //     data.append("file", event.target.files[0]);

  //     let config = {
  //       header: {
  //         "Content-Type": "image/png",
  //         "X-Api-Key": process.env.VUE_APP_API_KEY,
  //       },
  //     };

  //     axios
  //       .post("https://api.intern.d-tt.nl/api/houses//upload", data, config)
  //       .then((response) => {
  //         console.log("image upload response > ", response);
  //       });
  //   },
};
</script>

<style scoped>
img {
  width: 250px;
  height: auto;

  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
