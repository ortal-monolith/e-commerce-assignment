<template>
  <div class="products-list">
    <div v-for="product in products" v-bind:key="product.id">
      <router-link :to="`/product/${product.id}`">
        <img :src="imager(product.images[0].url)" alt="product.images[0].title"/>
      </router-link>
      <p class="title"><strong>{{product.title}}</strong></p>
      <p class="price">${{product.max_price}}</p>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
      products () {
          return this.$store.state.products;
      }
  }
};
</script>

 <style lang="less" scoped>
    .products-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    > div {
        margin: 10px;
        p {
            text-align: left;
        }
    }
    

    img {
        width: 280px;
        height: 280px;
        cursor: pointer;
    }
    }
</style>