<template lang="pug">
section(v-if="services.length > 0")
    service(
    v-for="(service, index) in services"
    :name="service.name"
    :description="service.description"
    :img="service.img"
    :id="service._id"
    :key="service._id")
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
  async mounted() {
    this.services = await this.getAll();
    EventBus.$on('service:new', (s) => {
      const newService = {
        name: s.name,
        description: s.description,
        _id: s._id,
      };
      if (s.img) {
        newService.img = s.img;
      }
      this.services.unshift(newService);
    });
    EventBus.$on('service:delete', (id) => {
      const index = this.services.findIndex(service => service._id === id);
      this.services.splice(index, 1);
    });
  },
  methods: {
    async getAll() {
      const response = await this.$http.get(`${this.$config.url}/infos`);
      if (response.data) {
        return response.data;
      }
      return [];
    },
  },
};
</script>
