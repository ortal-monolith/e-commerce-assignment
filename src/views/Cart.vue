<template>
  <div>
    <h1>To be continue...</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: []
    };
  },
  created() {
    let self = this;

    // get all cart's item
    fetch(`https://fedtest.monolith.co.il/api/cart/get`)
      .then(response => {
        // got an http response, turn it to json
        return response.json();
      })
      .then(jsonObj => {
        self.cart = jsonObj.data;
      })
      .catch(error => alert(`Something went wrong, please try again later. Error: ${error}`));
  }
};
</script>

<style lang="less" scoped>
</style>