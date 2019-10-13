<template lang="pug">
.jumbotron.bg-light.my-1(v-if="announces.length > 0")
  announce(
    v-for="announce in announces"
    :description="announce.description"
    :date="announce.date"
    :id="announce._id"
    :key="announce._id"
  )
.h5.text-muted.text-center(v-else) Nu sunt incă anunțuri postate.
</template>

<script>
import { EventBus } from '../../utils/eventbus';
import announce from './Announce.vue';

export default {
  data() {
    return {
      announces: [],
    };
  },
  components: {
    announce,
  },
  async mounted() {
    this.announces = await this.getAll();
    EventBus.$on('announce:new', (announce) => {
      this.announces.unshift(announce);
    });
    EventBus.$on('announce:delete', (id) => {
      const index = this.announces.findIndex(announce => announce._id === id);
      this.announces.splice(index, 1);
    });
  },
  methods: {
    async getAll() {
      const response = await this.$http.get(`${this.$config.url}/announces`);
      if (response.data.result) return response.data.result;
      return [];
    },
  },
};
</script>
