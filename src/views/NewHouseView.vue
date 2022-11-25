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
        <h3 v-if="!id" class="left">Create New Listing</h3>
        <h3 v-if="id" class="left">Update House</h3>
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
                v-model="house.streetName"
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
                v-model="house.houseNumber"
                min="0"
                id="houseNumber"
                placeholder="Enter house number"
              />
            </div>
            <div class="col2">
              <label>Addition (optional)</label>
              <input
                type="text"
                v-model="house.numberAddition"
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
                v-model="house.zip"
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
                v-model="house.city"
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
                v-model="house.price"
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
                v-model="house.size"
                id="size"
                placeholder="e.g. 60m2"
              />
            </div>
            <div class="col2">
              <label>Garage*</label>
              <select
                required
                v-model="house.hasGarage"
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
                v-model="house.bedrooms"
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
                v-model="house.bathrooms"
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
                v-model="house.constructionYear"
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
                v-model="house.description"
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
import { useStore } from "vuex";
export default {
  name: "NewHouseView",
  props: ["id"],
  data() {
    return {
      loadingState: true,
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
    };
  },
  components: { PhotoCard },
  mounted() {
    if (this.id) {
      const store = useStore();
      store
        .dispatch("initializeHouses")
        .catch(
          (errorMessage) =>
            (this.loadingError = "Loading content failed:" + errorMessage)
        )

        .finally(() => (this.loadingState = false));
    } else {
      this.loadingState = false;
    }
  },
  computed: {
    houses: function () {
      const store = useStore();
      return store.getters.getAll();
    },
    house: function () {
      if (this.id && this.houses.length > 0) {
        const houseToUpdate = this.houses.find((h) => h.id == this.id);
        const parseAddress = (adr) => {
          if (!adr) return {};
          const indexFirstNumber = adr.search(/\d/);
          const street = adr.substring(0, indexFirstNumber).trim();

          const rest = adr.substring(indexFirstNumber);
          const firstNonDigitIndex = rest.search(/\D/);
          const number = rest.substring(0, firstNonDigitIndex).trim();
          const additional = rest.substring(firstNonDigitIndex).trim();

          return { street, number, additional };
        };
        const addressData = parseAddress(houseToUpdate.location?.street);
        return {
          id: houseToUpdate.id,
          price: houseToUpdate.price,
          bedrooms: houseToUpdate.rooms?.bedrooms,
          bathrooms: houseToUpdate.rooms?.bathrooms,
          size: houseToUpdate.size,
          streetName: addressData.street,
          houseNumber: addressData.number,
          numberAddition: addressData.additional,
          zip: houseToUpdate.location?.zip,
          city: houseToUpdate.location?.city,
          constructionYear: houseToUpdate.constructionYear,
          hasGarage: houseToUpdate.hasGarage,
          description: houseToUpdate.description,
        };
      } else
        return {
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
        };
    },
  },
  methods: {
    submitForm: function (e) {
      e.preventDefault();

      const isEmpty = (str) => !str || str.trim().length === 0;
      this.errors = [];
      if (isEmpty(this.house.streetName)) {
        this.errors.push("Please enter street name");
      }
      if (!this.house.houseNumber) {
        this.errors.push("Please enter house number");
      }
      if (isEmpty(this.house.zip)) {
        this.errors.push("Please enter postal code");
      }
      if (isEmpty(this.house.city)) {
        this.errors.push("Please enter city");
      }
      if (!this.house.price) {
        this.errors.push("Please enter price");
      }
      if (!this.house.size) {
        this.errors.push("Please enter size");
      }
      if (
        this.house.hasGarage === undefined ||
        this.house.hasGarage === "Select"
      ) {
        this.errors.push("Please select if there is garage");
      }
      if (!this.house.bedrooms) {
        this.errors.push("Please enter how many bedrooms does the house have");
      }
      if (!this.house.bathrooms) {
        this.errors.push("Please enter how many bathrooms does the house have");
      }
      if (!this.house.constructionYear) {
        //Range ekle
        this.errors.push("Please enter construction year");
      }
      if (isEmpty(this.house.description)) {
        this.errors.push("Please enter description");
      }
      console.log("Errors has", this.errors.length);

      if (this.errors.length) return;

      this.inSaving = true;

      this.$store
        .dispatch("addHouse", {
          ...this.house,
        })
        .then(async (createdHouseId) => {
          if (this.house.id) {
            this.successMessage = "House updated with id " + createdHouseId;
          } else {
            this.successMessage = "House created with id " + createdHouseId;
          }

          //Only upload if house is new
          if (!this.house.id) {
            try {
              await this.$refs.photoCard.doSave(createdHouseId);
              this.$router.push({ path: "/housedetails/" + createdHouseId });
            } catch (e) {
              console.log(e, "error while image uploding");
              this.errors = [
                "image cannot uploaded:",
                e.message ? e.message : JSON.stringify(e),
              ];
            }
          }

          this.inSaving = false;
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

  background-attachment: fixed;
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
</style>
