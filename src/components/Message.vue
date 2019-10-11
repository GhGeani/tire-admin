<template lang="pug">
  section.container.my-1.alert(:class="getAlertType()")
    small {{ message }}
    button(type="button" class="close" @click="hideMessage")
      span(aria-hidden="true") &times;
</template>

<script>
import { EventBus } from '../utils/eventbus';

export default {
  props: {
    message: String,
    status: String,
  },
  methods: {
    getAlertType() {
      if (this.status === 'success') return 'alert-success';
      return 'alert-danger';
    },
    hideMessage() {
      EventBus.$emit('message:hideMessage');
    },
  },
};
</script>
