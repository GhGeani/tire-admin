<template lang="pug">
  .col-12.col-sm-6.col-md-4.col-lg-3.p-2
    router-link(:to="`/vanzari/${id}`" tag="div").card.link
      img.img-thumbnail.card-img-top.max-height(
        v-bind:src="`${this.$config.url}/files/${image}`"
        )
      .card-body
        strong.card-title {{ title }}
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    image: String,
    date: String,
    id: String,
  },
};
</script>

<style lang="stylus" scoped>
.link
  cursor pointer
  box-shadow: 3px 3px 2px -4px rgba(0,0,0,.7)
  color #545454
  &:hover
    transition .2s
    box-shadow: 8px 8px 6px -6px rgba(0,0,0,.5)
    opacity .9
.max-height
  max-height 13rem
</style>
