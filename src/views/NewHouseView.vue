<template>
  <div class="container">
    <div class="row">
      <div class="col2 expandOnSmall">
        <router-link class="left" to="/">
          <span class="material-symbols-outlined"> keyboard_backspace </span>
          Back Back to the overview</router-link
        >
      </div>
    </div>
    <div class="row">
      <div class="col2 expandOnSmall">
        <h3 class="left">Create New Listing</h3>
      </div>
    </div>
    <div class="row">
      <div class="col2 expandOnSmall">
        <form action="/add" @submit="submitForm" method="post" id="addForm">
          <div class="row">
            <div class="col1">
              <label>Street Name*</label>
              <input
                type="text"
                required
                v-model="streetName"
                id="streetName"
                placeholder="Enter the street name"
              />
            </div>
          </div>
          <div class="row">
            <div class="col2">
              <label>House Number*</label>
              <input
                type="number"
                required
                v-model="houseNumber"
                min="0"
                id="houseNumber"
                placeholder="Enter house number"
              />
            </div>
            <div class="col2">
              <label>Addition (optional)</label>
              <input
                type="text"
                v-model="numberAddition"
                id="numberAddition"
                placeholder="e.g. A"
              />
            </div>
          </div>
          <div class="row">
            <div class="col1">
              <label>Postal code*</label>
              <input
                type="text"
                required
                v-model="zip"
                id="zip"
                placeholder="e.g. 1000 AA"
              />
            </div>
          </div>
          <div class="row">
            <div class="col1">
              <label>City*</label>
              <input
                type="text"
                required
                v-model="city"
                id="city"
                placeholder="e.g. Utrecht"
              />
            </div>
          </div>
          <div class="row">
            <div class="col1">
              <label>Upload picture (PNG or JPG)*</label>
              <br />
              <PhotoCard ref="photoCard" />
            </div>
          </div>

          <div class="row">
            <div class="col1">
              <label>Price*</label>
              <input
                type="number"
                required
                min="0"
                v-model="price"
                id="price"
                placeholder="e.g. €150.000"
              />
            </div>
          </div>
          <div class="row">
            <div class="col2">
              <label>Size*</label>
              <input
                type="number"
                required
                min="0"
                v-model="size"
                id="size"
                placeholder="e.g. 60m2"
              />
            </div>
            <div class="col2">
              <label>Garage*</label>
              <select
                required
                v-model="hasGarage"
                id="hasGarage"
                placeholder="Select"
              >
                <option value="Select">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col2">
              <label>Bedrooms*</label>
              <input
                type="number"
                required
                v-model="bedrooms"
                min="0"
                id="bedrooms"
                placeholder="Enter amount"
              />
            </div>
            <div class="col2">
              <label>Bathrooms*</label>
              <input
                type="number"
                required
                min="0"
                v-model="bathrooms"
                id="bathrooms"
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div class="row">
            <div class="col1">
              <label>Construction date*</label>
              <input
                type="number"
                min="0"
                max="{{ new Date().getFullYear() }}"
                required
                v-model="constructionYear"
                placeholder="e.g. 1990"
                id="constructionYear"
              />
            </div>
          </div>

          <div class="row">
            <div class="col1">
              <label>Description*</label>
              <textarea
                rows="4"
                required
                v-model="description"
                id="description"
                placeholder="Enter description"
                class="extraLong"
              />
            </div>
          </div>
          <div class="row">
            <div class="col1">
              <div v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="(error, index) in errors" :key="index">
                    {{ error }}
                  </li>
                </ul>
              </div>
              <div v-if="successMessage">
                <h3>{{ successMessage }}</h3>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col1" v-if="!inSaving">
              <input type="submit" value="POST" />
            </div>
            <div class="col1" v-if="inSaving">Saving...</div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoCard from "@/components/PhotoCard.vue";
export default {
  name: "NewHouseView",
  data() {
    return {
      inSaving: false,
      successMessage: null,
      price: null,
      bedrooms: null,
      bathrooms: null,
      size: null,
      streetName: "",
      houseNumber: null,
      numberAddition: null,
      zip: "",
      city: "",
      constructionYear: null,
      hasGarage: "Select",
      description: "",
      errors: [],
      imgError: null,
      media: [],
      uploadPath: "",
    };
  },
  components: { PhotoCard },
  methods: {
    submitForm: function (e) {
      e.preventDefault();

      const isEmpty = (str) => !str || str.trim().length === 0;
      this.errors = [];
      if (isEmpty(this.streetName)) {
        this.errors.push("Please enter street name");
      }
      if (!this.houseNumber) {
        this.errors.push("Please enter house number");
      }
      if (isEmpty(this.zip)) {
        this.errors.push("Please enter postal code");
      }
      if (isEmpty(this.city)) {
        this.errors.push("Please enter city");
      }
      if (!this.price) {
        this.errors.push("Please enter price");
      }
      if (!this.size) {
        this.errors.push("Please enter size");
      }
      if (!this.hasGarage || this.hasGarage === "Select") {
        this.errors.push("Please select if there is garage");
      }
      if (!this.bedrooms) {
        this.errors.push("Please enter how many bedrooms does the house have");
      }
      if (!this.bathrooms) {
        this.errors.push("Please enter how many bathrooms does the house have");
      }
      if (!this.constructionYear) {
        //Range ekle
        this.errors.push("Please enter construction year");
      }
      if (isEmpty(this.description)) {
        this.errors.push("Please enter description");
      }
      console.log("Errors has", this.errors.length);

      if (this.errors.length) return;

      this.inSaving = true;

      this.$store
        .dispatch("addHouse", {
          price: this.price,
          bedrooms: this.bedrooms,
          bathrooms: this.bathrooms,
          size: this.size,
          streetName: this.streetName,
          houseNumber: this.houseNumber,
          numberAddition: this.numberAddition,
          zip: this.zip,
          city: this.city,
          constructionYear: this.constructionYear,
          hasGarage: this.hasGarage,
          description: this.description,
        })
        .then((createdHouse) => {
          this.successMessage = "House created with id " + createdHouse.id;

          //for reaching the child's functions
          this.$refs.photoCard.doSave(createdHouse.id);

          this.inSaving = false;
          //Clear form
        })
        .catch((error) => {
          this.errors = ["Saving failed:" + error];
          this.inSaving = false;
        });
    },
  },
};
</script>

<style scoped>
.container {
  background-image: linear-gradient(
      to right,
      rgba(255, 255, 255) 0%,
      rgba(255, 255, 255) 50%,
      transparent 80%
    ),
    url("../assets/houseDTT.jpeg");
  height: 100vh;
  background-size: cover;

  padding-left: 15%;
}
.left {
  float: left;
  text-decoration: none;
  color: black;
}

input[type="text"],
input[type="number"],
textarea,
select {
  padding: 12px 20px;
  margin: 8px 2px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  float: left;
  width: 100%;
  height: 40px;
}
.extraLong {
  height: 120px;
}
/* Hide arrows in number inputs for: Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Hide arrows in number inputs for: Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

label {
  float: left;
}

.row {
  float: left;
  width: 100%;
  display: block;
}

.col1 {
  float: left;
  width: 96%;
  display: inline;
  margin-left: 2%;
  margin-right: 2%;
}

.col2 {
  float: left;
  width: 46%;
  display: inline;
  margin-left: 2%;
  margin-right: 2%;
}

.expandOnSmall {
  width: 46%;
}

@media screen and (max-width: 768px) {
  .expandOnSmall {
    width: 96%;
  }
}

input[type="submit"] {
  padding: 14px 20px;
  margin: 4px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
  color: white;
  background-color: rgb(223, 88, 9);
  font-weight: bold;
}
.houseBackground {
  background-image: url("../assets/houseDTT.jpeg");
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 75%,
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
