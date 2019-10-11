<template lang="pug">
  section(v-if="services")
    service(
    v-for="(service, index) in services"
    :name="service.name"
    :description="service.description"
    :img="service.img"
    :key="index")
  h5.text-muted.text-center(v-else) Nu sunt servicii afișate.
</template>

<script>
import { EventBus } from '../../utils/eventbus';

import service from './Service.vue';

export default {
  data() {
    return {
      services: [],
    };
  },
  components: {
    service,
  },
  methods: {
    async getAll() {
      const response = await this.$http.get(`${this.$config.url}/infos`);
      this.services = response.data;
    },
  },
  async mounted() {
    await this.getAll();
    console.log(this.services);
    EventBus.$on('service:new', (s) => {
      const newService = {
        name: s.get('name'),
        description: s.get('description'),
        img: s.get('file').name,
      };
      this.services.unshift(newService);
    });
  },
};
</script>
