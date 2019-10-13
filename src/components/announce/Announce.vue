<template lang="pug">
  li.list-group-item.my-1
    small.float-right {{ date }}
    p.mb-1.mt-4 {{ description }}
    .container.bg-secondary.d-flex.justify-content-end
      button.btn.fas.fa-trash.text-warning(@click="del(id)")
</template>

<script>
import { EventBus } from '../../utils/eventbus';

export default {
  props: {
    description: String,
    date: String,
    id: String,
  },
  methods: {
    async del(id) {
      try {
        const response = await this.$http.delete(`${this.$config.url}/announce/${id}`);
        if (response.status === 200) {
          EventBus.$emit('announce:delete', id);
          EventBus.$emit('message:showMessage', {
            message: 'Anunțul a fost șters cu succes.',
            status: 'success',
          });
        }
      } catch (e) {
        EventBus.$emit('message:showMessage', {
          message: 'Anunțul nu a putut fi șters',
          status: 'error',
        });
      }
    },
  },
};
</script>
