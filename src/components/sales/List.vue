<template lang="pug">
  .row(v-if="sales")
    sale(
      v-for="sale in sales"
      :title="sale.name" :description="sale.description"
      :image="sale.images[0]" :date="sale.date"
      :id="sale._id"
      :key="sale._id"
    )
  h5.text-muted.text-center(v-else) Nu a fost gasit nici un produs.
</template>

<script>
import { EventBus } from '../../utils/eventbus';

import sale from './Sale.vue';

export default {
  props: {
    sales: {},
  },
  components: {
    sale,
  },
  mounted() {
    EventBus.$on('sale:new', (data) => {
      const newSale = {
        name: data.get('name'),
        description: data.get('description'),
        image: data.get('files[0]'),
        date: data.get('date'),
      };
      this.sales.unshift(newSale);
    });
  },
};
</script>

<style lang="css" scoped>

@media (max-width: 991.98px) {
  img {
    height: 15rem;
    width: 15rem;
  }
}
</style>
