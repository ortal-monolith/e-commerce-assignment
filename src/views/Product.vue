<template>
  <div class="product-details">
    <div class="image-container">
      <div class="main">
        <img v-if="show_variant" :src="imager(variant.image.url)" alt="variant.image.title" />
        <img
          v-else-if="product.images"
          :src="imager(product.images[0].url)"
          alt="product.images[0].title"
        />
      </div>
      <div class="others" v-if="!show_variant">
        <img v-for="img in product.images" :key="img.title" :src="imager(img.url)" alt="img.title" />
      </div>
    </div>
    <div class="details">
      <div class="title">
        <h1 v-if="show_variant">{{variant.title}}</h1>
        <h1 v-else>{{product.title}}</h1>
      </div>
      <div class="price">
        <span v-if="show_variant">$ {{variant.price}}</span>
        <span v-else>$ {{product.max_price}}</span>
      </div>
      <div class="text">
        <span v-if="!show_variant">{{product.description}}</span>
      </div>
    </div>
    <div class="menu">
      <b-form @submit="onSubmit">
        <b-form-group id="input-group-1">
          <SelectItem
            ref="selectItem"
            v-for="attr in product.attributes"
            v-on:select-item="onSelectItem"
            :key="attr.id"
            :attribute="attr"
          />
        </b-form-group>
        <b-form-group id="input-group-2" label="Quntity:" label-for="input-2">
          <b-input
            type="number"
            id="input-2"
            name="quantity"
            min="1"
            max="5"
            v-model="quantity"
            required
          ></b-input>
        </b-form-group>

        <div class="message error" v-if="message">
          <p>{{message}}</p>
        </div>

        <b-button type="submit" variant="primary">Add to cart</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import SelectItem from "@/components/SelectItem.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    SelectItem
  },
  data() {
    return {
      product: {},
      variant: {},
      quantity: 1,
      valid: true,
      message: null,
      show_variant: false
    };
  },
  computed: {
    ...mapState(["products"]),
    ...mapActions(["resetAttrSelection"])
  },
  created() {
    let self = this,
      productId = this.$route.params.id;

    fetch(`https://fedtest.monolith.co.il/api/catalog/get?id=${productId}`)
      .then(response => {
        // got an http response, turn it to json
        return response.json();
      })
      .then(jsonObj => {
        self.product = jsonObj.data;
      })
      .catch(error =>
        alert(`Something went wrong, please try again later. Error : ${error}`)
      );
  },
  methods: {
    onSelectItem() {
      this.message = null;
      this.show_variant = false;

      let choosen_variant = this.$store.state.choosen_variant,
        variants = this.product.variants,
        is_valid = this.validate(choosen_variant, this.product.attributes),
        variant;

      if (is_valid) {
        variant = this.getVariant(choosen_variant, variants);

        if (!variant) {
          // user select all but no match variant was found
          this.message = "Item is not available in inventory";
          return;
        }
        this.variant = variant;
        this.show_variant = true;
      }
    },
    getVariant(choosen_variant, variants) {
      let arrayToDict = function(arr) {
        let dict = {};
        for (let i of arr) {
          dict[i["attribute_id"]] = i["label_id"];
        }
        return dict;
      };

      let user_variant_dict = arrayToDict(choosen_variant);

      for (let v of variants) {
        let is_valid = this.validate(v.labels, choosen_variant);
        if (!is_valid) {
          // user select all but no match variant was found
          this.message = "Item is not available in inventory";
          return;
        }

        let label_dict = arrayToDict(v.labels);
        if (
          JSON.stringify(label_dict, Object.keys(label_dict).sort()) ==
          JSON.stringify(
            user_variant_dict,
            Object.keys(user_variant_dict).sort()
          )
        ) {
          return v;
        }
      }
    },
    resetForm() {
      // reset form fields
      this.quantity = 1;

      this.$refs.selectItem.forEach(function(item) {
        item.clear();
      });
    },
    validate(arr1, arr2) {
      return arr1.length === arr2.length;
    },
    onSubmit(event) {
      event.preventDefault();
      this.message = null;
      let choosen_variant = this.$store.state.choosen_variant,
        variants = this.product.variants,
        is_valid = this.validate(choosen_variant, this.product.attributes);

      if (!is_valid) {
        // not all fields are selected
        this.message = "Not all fields are selected";
        return;
      }

      let variant = this.getVariant(choosen_variant, variants);
      if (!variant) {
        // user select all but no match variant was found
        this.message = "Item is not available in inventory";
        return;
      }

      // add variant to cart
      let self = this;

      fetch(
        `https://fedtest.monolith.co.il/api/cart/add?variant_id=${variant.id}&quantity=${self.quantity}`
      )
        .then(response => {
          // got an http response, turn it to json
          return response.json();
        })
        .then(jsonObj => {
          self.cart = jsonObj.data;
          console.log("updated cart: ", self.cart);
          self.resetForm();
        })
        .catch(error =>
          alert(
            `Something went wrong, please try again later. Error : ${error}`
          )
        );
    }
  }
};
</script>

<style lang="less" scoped>
.product-details {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;

  .image-container {
    display: flex;
    flex-direction: column;
    justify-content: top;
    .main img {
      width: 425px;
      height: 425px;
    }
    .others {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 425px;

      img {
        width: 127px;
        height: 127px;
      }
    }
  }
  .details {
    display: flex;
    flex-direction: column;
    justify-content: left;
    text-align: left;
    width: 45%;
    padding: 10px;

    .price {
      margin: 10px 0px;
    }
  }
  .menu {
    display: flex;
    flex-direction: column;
    justify-content: left;
    text-align: left;

    .error {
      color: red;
    }
  }
}
</style>
