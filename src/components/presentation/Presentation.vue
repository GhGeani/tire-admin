<template lang="pug">
.container(v-if="slides.length > 0")
  .jumbotron.h-100(v-for="(slide, index) in slides")
    img.img-fluid(:src="`${$config.url}/files/${slide.img}`")
    .container.text-center
      p.lead {{ slide.text }}
    .container.bg-secondary.d-flex.justify-content-end
        button.btn.fas.fa-trash.text-warning(@click="del(slide._id)")
h5.text-muted.text-center(v-else) Nu a fost găsit nici un slide de prezentare.
</template>

<script>
import { EventBus } from '../../utils/eventbus';

export default {
  data() {
    return {
      slides: [],
    };
  },
  async mounted() {
    this.slides = await this.getSlides();
    EventBus.$on('slide:new', (slide) => {
      this.slides.unshift(slide);
    });
  },
  methods: {
    async getSlides() {
      const response = await this.$http.get(`${this.$config.url}/slides`);
      if (response.data) return response.data;
      return [];
    },
    async del(id) {
      try {
        const response = await this.$http.delete(`${this.$config.url}/slide/${id}`);
        if (response.status === 200) {
          const index = this.slides.findIndex(slide => slide._id === id);
          this.slides.splice(index, 1);
          EventBus.$emit('message:showMessage', {
            message: 'Imagine ștearsă cu succes.',
            status: 'success',
          });
        }
      } catch (e) {
        EventBus.$emit('message:showMessage', {
          message: 'Imaginea nu a putut fi ștearsă',
          status: 'error',
        });
      }
    },
  },
};
</script>
