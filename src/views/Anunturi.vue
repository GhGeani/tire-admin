<template lang="pug">
  .container-fluid
    create-announce(v-show="show")
    announce-list
</template>

<script>
import { EventBus } from '../utils/eventbus';

import AnnounceList from '../components/announce/List.vue';
import CreateAnnounce from '../components/announce/CreateAnnounce.vue';

export default {
  name: 'anunturi',
  components: {
    AnnounceList,
    CreateAnnounce,
  },
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    EventBus.$on('createForm:show', () => {
      this.show = true;
    });
    EventBus.$on('createForm:close', () => {
      this.show = false;
    });
  },
};
</script>
