<template lang="pug">
  .col-12.col-sm-6.col-md-4.col-lg-3.p-2
    .container.bg-dark.d-flex.justify-content-end
      button.btn.btn-lg.fas.fa-trash.text-warning(@click="del(id)")
    router-link(:to="`/vanzari/${id}`" tag="div").card.link
      img.img-thumbnail.card-img-top.max-height(
        v-bind:src="`https://res.cloudinary.com/demsdreams/image/upload/v1573995199/${$config.folder}/${image}.jpg`"
        )
      .card-body
        p.font-weight-bold.card-title {{ title }}

</template>

<script>
import { EventBus } from '../../utils/eventbus';

export default {
  props: {
    title: String,
    description: String,
    image: String,
    date: String,
    id: String,
  },
  methods: {
    async del(id) {
      try {
        const { status } = await this.$http.delete(`${this.$config.url}/item/${id}`);
        if (status === 200) {
          EventBus.$emit('sale:delete', id);
          EventBus.$emit('message:showMessage', {
            message: 'Produsul a fost șters cu succes.',
            status: 'success',
          });
        }
      } catch (e) {
        EventBus.$emit('message:showMessage', {
          message: 'Produsul nu a putut fi șters',
          status: 'error',
        });
      }
    },
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
