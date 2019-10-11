<template lang="pug">
.container
  .jumbotron.bg-light.text-center(v-if="img !== undefined")
    .row
      .col-12.col-md-6.text-center.m-auto
        h2.text-muted {{ name }}
        p.lead {{ description }}
      .col-12.col-md-6
        img.img-thumbnail(:src="`${$config.url}/files/${img}`")
  .jumbotron.bg-secondary.text-white.text-center(v-if="img == undefined")
      h2 {{ name }}
      p.lead {{ description }}
</template>

<script>
export default {
  props: {
    name: String,
    description: String,
    img: String,
  },
};
</script>

<style lang="stylus" scoped>
.fas
  color #EA846F
  font-size 30px
img
  width 25rem
  height 13rem
  opacity 0.8
  box-shadow 1px 1px 10px 2px rgba(0, 0, 0, 0.2)
</style>
