<template lang="pug">
.container.my-3
  .container.bg-dark.d-flex.justify-content-end.shadow
    button.btn.btn-lg.text-success(@click="onSubmit")
      i.fas.fa-save(v-if="!loading")
      .spinner-border(v-else)
    button.btn.btn-lg.text-danger(@click="closeForm")
      i.fas.fa-times
  form.jumbotron.bg-light.shadow.my-3.form-group.m-auto(v-on:submit="onSubmit")
    textarea.form-control.change-border(v-model="announce" rows="3" placeholder="Intrudu anunțul aici...").w-100
</template>

<script>
import { EventBus } from '../../utils/eventbus';

export default {
  name: 'create-announce',
  data() {
    return {
      announce: '',
      loading: false,
    };
  },
  methods: {
    closeForm() {
      EventBus.$emit('createForm:close');
    },
    async onSubmit(e) {
      e.preventDefault();
      await this.saveAnnounce(this.announce);
      this.announce = '';
      this.closeForm();
    },
    async saveAnnounce(announce) {
      try {
        this.loading = true;
        const date = new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' });
        const response = await this.$http.post(`${this.$config.url}/announce`, {
          description: announce,
          date,
        });
        if (response.status === 201) {
          this.add(response.data);
          EventBus.$emit('message:showMessage', {
            message: 'Anunțul s-a postat cu succes.',
            status: 'success',
          });
        }
        this.loading = false;
      } catch (error) {
        EventBus.$emit('message:showMessage', {
          message: 'Eroare: Anunțul nu a fost postat.',
          status: 'error',
        });
        this.loading = false;
      }
    },
    add(announce) {
      EventBus.$emit('announce:new', announce);
    },
  },
};
</script>

<style lang="stylus" scoped>
.shadow
  box-shadow 3px 4px -6px 5px rgba(0,0,0,.4);
.change-border
  color grey
</style>
