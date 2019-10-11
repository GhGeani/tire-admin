<template lang="pug">
  .container
    create-slide(v-show="show")
    presentation
</template>

<script>
import { EventBus } from '../utils/eventbus';

import Presentation from '../components/presentation/Presentation.vue';
import CreateSlide from '../components/presentation/CreateSlide.vue';

export default {
  name: 'prezentare',
  components: {
    Presentation,
    CreateSlide,
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
