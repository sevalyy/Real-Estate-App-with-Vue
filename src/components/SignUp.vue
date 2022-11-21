<template>
  <div>
    <div class="container">
      <form @submit.prevent="handleSubmit">
        <h2>Register</h2>
        <div class="input">
          <label for="email">Email address: </label>
          <input
            class="form-control"
            type="text"
            name="email"
            placeholder="email@adress.com"
            v-model="email"
          />
        </div>
        <div class="input">
          <label for="name">Name: </label>
          <input
            class="form-control"
            type="text"
            name="text"
            placeholder="Jane Doe"
            v-model="name"
          />
        </div>

        <button type="submit" class="btn-search">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostPage",

  data() {
    return {
      email: "",
      name: "",
    };
  },

  methods: {
    handleSubmit() {
      const loginData = new FormData();
      loginData.append("email", this.email);
      loginData.append("name", this.name);

      axios
        .post("https://api.intern.d-tt.nl/api/register", loginData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>
<style scoped>
.container {
  margin: auto;
  margin-top: 10%;
  padding: 70px 0;
  width: 60%;
  border-radius: 10px;

  text-align: center;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
}
.input {
  margin: 30px 0;
}
.btn-search {
  background-color: #000;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
