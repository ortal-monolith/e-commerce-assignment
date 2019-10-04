<template>
  <div class="home">
    <SearchBar/>
    <ProductsList/>
  </div>
</template>

<script>

import SearchBar from '@/components/SearchBar.vue'
import ProductsList from '@/components/ProductsList.vue'

export default {
  name: 'home',
  components: {
    SearchBar,
    ProductsList
    },
  created () {
    let url = 'https://fedtest.monolith.co.il/api/catalog/getAll',
        self = this;
    fetch(url)
    .then((response) => {
      // got an http response, turn it to json
        return response.json();
      })
    .then((jsonObj) => {
      // save products list in the store to get access to it later from product page
      self.$store.state.products = jsonObj.data;
    })
    .catch(error => alert(`Something went wrong, please try again later. Error: ${error}`));
  }
}
</script>
