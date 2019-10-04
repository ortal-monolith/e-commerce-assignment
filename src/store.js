import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    choosen_variant: []
  },
  mutations: {
    selectAttr(state, payload) {
      let choosen_variant = state.choosen_variant,
        attribute_id = payload.attribute_id,
        label_id = payload.label_id,
        selected_attr = choosen_variant.find(
          item => item.attribute_id == attribute_id
        );

      if (selected_attr) {
        let index = choosen_variant.indexOf(selected_attr);
        if (label_id === "null")
          choosen_variant.splice(index, 1);
        else
          choosen_variant.splice(index, 1, { attribute_id: attribute_id, label_id: label_id });
      }
      else choosen_variant.push({ attribute_id: attribute_id, label_id: label_id });
    },
    resetAttrSelection (state) {
      state.choosen_variant = [];
    }
  },
  actions: {
    selectAttr (context, payload) {
      context.commit('selectAttr', payload, context.state);
    },
    resetAttrSelection (context) {
      context.commit('resetAttrSelection');
    }
  }
})
