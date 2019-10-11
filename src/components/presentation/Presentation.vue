<template lang="pug">
.jumbotron.h-100
  .carousel.slide#imgs(data-ride='carousel')
      ol.carousel-indicators
        li(
          data-target='#imgs'
          :data-slide-to='`index`'
          v-for="(slide, index) in slides" :class="{active: index === 0}"
          )
      .carousel-inner
        .carousel-item.position-relative(
          v-for="(slide, index) in slides"
          :class="{active: index === 0}"
          )
          img.img-fluid(:src="`${$config.url}/files/${slide.img}`")
          .container-fluid.text-center.container-slide.position-absolute.pb-5
            p.text-white.text-slide.p-5 {{ slide.text }}
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
    await this.getSlides();
    EventBus.$on('slide:new', (slide) => {
      const newSlide = {
        text: slide.get('text'),
        img: slide.get('file').name,
      };
      this.slides.unshift(newSlide);
    });
  },
  methods: {
    async getSlides() {
      const response = await this.$http.get(`${this.$config.url}/slides`);
      this.slides = response.data;
    },
  },
};
</script>

<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css?family=Righteous&display=swap')

.carousel-item
  background-color rgba(0,0,0, 1)
img
  opacity .3
.container-slide
  height 100%
  width  100%
  top 0
  left 0
  right 0
  bottom 0
  margin auto
.text-slide
  font-family: 'Righteous', cursive;
  font-size 1.3rem
</style>
