<template lang="pug">
.container.my-3
  .container.bg-dark.d-flex.justify-content-end
      button.btn.fas.fa-trash.text-warning(@click="del(id)")
  .jumbotron.bg-light.text-center(v-if="img !== undefined")
    .row
      .col-12.col-md-6.text-center.m-auto
        h2.text-muted {{ name }}
        p.lead {{ description }}
      .col-12.col-md-6
        img.img-thumbnail(:src="`https://res.cloudinary.com/demsdreams/image/upload/v1573995199/${$config.folder}/${img}.jpg`")
  .jumbotron.bg-secondary.text-white.text-center(v-if="img == undefined")
    h2 {{ name }}
    p.lead {{ description }}

</template>

<script>
import { EventBus } from '../../utils/eventbus';

export default {
  props: {
    name: String,
    description: String,
    img: String,
    id: String,
  },
  methods: {
    async del(id) {
      try {
        const { status } = await this.$http.delete(`${this.$config.url}/info/${id}`);
        if (status === 200) {
          EventBus.$emit('service:delete', id);
          EventBus.$emit('message:showMessage', {
            message: 'Serviciul a fost șters cu succes.',
            status: 'success',
          });
        }
      } catch (e) {
        EventBus.$emit('message:showMessage', {
          message: 'Serviciul nu a putut fi șters',
          status: 'error',
        });
      }
    },
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
