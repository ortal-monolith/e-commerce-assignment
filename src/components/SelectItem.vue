<template>
  <div class="select-item">
    <b-form-select v-model="selected" @change="selectAttr()">
      <option value="null">Select {{attribute.title}}</option>
      <option v-for="label in attribute.labels" :key="label.id" :value="label.id">{{label.title}}</option>
    </b-form-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null
    };
  },
  props: {
    attribute: Object
  },
  methods: {
    selectAttr() {
      this.$store.dispatch("selectAttr", {
        attribute_id: this.attribute.id,
        label_id: this.selected
      });

      // send event to parent for validation
      this.$emit("select-item");
    },
    resetAttrSelection () {
      this.$store.dispatch('resetAttrSelection');
    },
    clear() {
      // reset select options and clear choosen_variant in store
      this.selected = null;
      this.resetAttrSelection();
    }
  }
};
</script>

<style lang="less" scoped>
.select-item {
  margin: 20px 0px;
}
</style>