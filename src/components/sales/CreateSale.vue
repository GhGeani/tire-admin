<template lang="pug">
.container.my-3
  .container.bg-dark.d-flex.justify-content-end.shadow
    button.btn.btn-lg.text-success(@click="onSubmit")
      i.fas.fa-save(v-if="!loading")
      .spinner-border(v-else)
    button.btn.btn-lg.text-danger(@click="closeForm")
      i.fas.fa-times
  form.container.p-3.bg-light.shadow.my-3.form-group.m-auto(v-on:submit="onSubmit")
    input.form-control(
      type="text"
      v-model="name"
      placeholder="Numele produsului...")
    textarea.form-control.change-border.w-100(
      v-model="description"
      rows="3"
      placeholder="Descrierea produsului..."
      )
    input.mt-1(
      type="file"
      id="files"
      ref="files"
      v-on:change="handleFileUpload()"
      class="form-control-file"
      multiple
      )
</template>

<script>
import { EventBus } from '../../utils/eventbus';

export default {
  name: 'create-sale',
  data() {
    return {
      name: '',
      description: '',
      files: '',
      loading: false,
    };
  },
  methods: {
    closeForm() {
      EventBus.$emit('createForm:close');
    },
    async onSubmit(e) {
      e.preventDefault();
      const formData = new FormData();
      for (let i = 0; i < this.files.length; i += 1) {
        const file = this.files[i];
        formData.append(`files[${i}]`, file, Date.now() + i);
      }
      formData.append('name', this.name);
      formData.append('description', this.description);
      formData.append('date', new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' }));
      await this.save(formData);
      this.closeForm();
    },
    async save(data) {
      try {
        this.loading = true;
        const result = await this.$http.post(
          `${this.$config.url}/item`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        if (result.status === 201) {
          this.add(result.data);
          EventBus.$emit('message:showMessage', {
            message: 'Un nou slide a fost creat în prezentare.',
            status: 'success',
          });
        }

        this.name = '';
        this.description = '';
        this.$refs.files.value = '';
        this.files = '';
        this.loading = false;
      } catch (error) {
        EventBus.$emit('message:showMessage', {
          message: 'Eroare: Slide-ul nu a fost postat.',
          status: 'error',
        });
        this.loading = false;
      }
    },
    add(data) {
      EventBus.$emit('sale:new', data);
    },
    handleFileUpload() {
      this.files = this.$refs.files.files;
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
