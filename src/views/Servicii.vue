<template lang="pug">
  .container-fluid.my-5
    create-service(v-show="show")
    services

</template>

<script>
import { EventBus } from '../utils/eventbus';

import services from '../components/service/List.vue';
import CreateService from '../components/service/CreateService.vue';

export default {
  name: 'servicii',
  components: {
    services,
    CreateService,
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
