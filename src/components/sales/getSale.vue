<template lang="pug">
.container.my-2(v-if="response")
  .row
    .jumbotron.col-12.col-lg-8.bg-light.carousel.slide#imgs(data-ride='carousel')
      .carousel-inner.text-center.bg-light
        .carousel-item.img-container(
          v-for="(slide, index) in response.data.images"
          :class="{active: index === 0}"
        )
          img.img-thumbnail.resize-img(:src="`https://res.cloudinary.com/demsdreams/image/upload/v1573995199/${$config.folder}/${showedPhoto}.jpg`")
      .container.d-flex.justify-content-center.overflow-auto
        img.img-thumbnail.img-indicator(
          data-target='#imgs'
          :data-slide-to='`index`'
          v-for="(slide, index) in response.data.images"
          :class="{active: index === 0}"
          :src="`https://res.cloudinary.com/demsdreams/image/upload/v1573995199/${$config.folder}/${slide}.jpg`"
          @click="changePhoto(slide)"
        )
    .card.col-12.col-lg-4.m-auto
      .card-body
        .card-title
          h5 {{ response.data.name }}
        .card-subtitle
          strong Descriere:
        .font-italic {{ response.data.description }}
        span
          strong Publicat:
          span {{ response.data.date }}
</template>

<script>
export default {
  data() {
    return {
      response: null,
      showedPhoto: '',
    };
  },
  async mounted() {
    await this.get();
    // eslint-disable-next-line
    this.showedPhoto = this.response.data.images[0];
  },
  methods: {
    async get() {
      this.response = await this.$http.get(`${this.$config.url}/item/${this.$route.params.id}`);
    },
    changePhoto(ph) {
      this.showedPhoto = ph;
    },
  },
};
</script>

<style lang="stylus" scoped>

.img-indicator

  width  50px
  height 50px
  cursor pointer
  opacity .7
  &:hover
   opacity .9
.img-container
  width 100%
  max-height 30rem
.resize-img
  width 100%
  height 100%
</style>
