<template lang="pug">
  section.bg-light
    create-sale(v-show="show")
    //- .container.my-3
    //-   form.form-group(v-on:submit.prevent="search")
    //-     input.form-control.lead(type="text" placeholder="Cauți ceva anume?" v-model="words")
    .container
        list(:sales="sales")
</template>

<script>
import { EventBus } from '../utils/eventbus';

import list from '../components/sales/List.vue';
import CreateSale from '../components/sales/CreateSale.vue';

export default {
  components: {
    list,
    CreateSale,
  },
  data() {
    return {
      sales: [],
      words: '',
      loading: false,
      show: false,
    };
  },
  async mounted() {
    await this.getAll();
    EventBus.$on('createForm:show', () => {
      this.show = true;
    });
    EventBus.$on('createForm:close', () => {
      this.show = false;
    });
  },
  methods: {
    async getAll() {
      this.loading = true;
      const response = await this.$http.get(`${this.$config.url}/items`);
      this.sales = response.data;
      this.loading = false;
    },
    async search() {
      const params = { page: 1 };
      if (this.words) params.words = this.words.replace(/ /g, ',');
      else params.words = ' ';
      this.loading = true;
      const response = await this.$http.get(`${this.$config.url}/items/search`, { params });
      this.sales = response.data;
      this.loading = false;
    },

  },
};
</script>
