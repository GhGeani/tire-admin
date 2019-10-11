<template lang="pug">
  main.h-100
    foote(v-if="$route.fullPath !== '/login'")
    nav-bar(v-if="$route.fullPath !== '/login'")
    message(:message="message.text" :status="message.status" v-if="message.show")
    router-view
</template>

<script>
import { EventBus } from './utils/eventbus';

import navBar from './components/NavBar.vue';
import Message from './components/Message.vue';
import Foote from './components/Foote.vue';

export default {
  components: {
    navBar,
    Foote,
    Message,
  },
  data() {
    return {
      message: {
        show: false,
        text: null,
        status: null,
      },
    };
  },
  mounted() {
    EventBus.$on('message:showMessage', (data) => {
      this.message.status = data.status;
      this.message.text = data.message;
      this.message.show = true;
    });
    EventBus.$on('message:hideMessage', () => {
      this.message.show = false;
    });
  },
};
</script>

<style lang="stylus">
html
body
  height 100%;
</style>
