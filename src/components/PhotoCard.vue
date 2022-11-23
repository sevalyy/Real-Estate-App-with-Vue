<template>
  <div id="preview">
    <img v-if="item.imageUrl" :src="item.imageUrl" />
    <p v-if="item.imageUrl">Photo Added</p>
  </div>
  <label for="upload" v-if="!item.imageUrl">+</label>
  <input type="file" accept="image/*" @change="onChange" id="upload" hidden />
</template>

<script>
import axios from "axios";

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
    doSave(houseId) {
      console.log("Do Save Executed", houseId);
      const data = new FormData();
      data.append("image", this.image);

      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Api-Key": process.env.VUE_APP_API_KEY,
        },
      };
      axios
        .post(
          "https://api.intern.d-tt.nl/api/houses/" + houseId + "/upload",
          data,
          config
        )
        .then((response) => {
          console.log("image upload response > ", response);
        });
    },
  },
};
</script>

<style scoped>
img {
  width: 250px;
  height: auto;

  display: block;
  margin: 10px auto;
}
label {
  border: 2px dotted darkgray;
  display: inline-block;
  font-weight: bold;
  font-size: 1.5em;
  padding: 2.5rem;
  border-radius: 0.3rem;
  cursor: pointer;
  margin-top: 1rem;
}
</style>
