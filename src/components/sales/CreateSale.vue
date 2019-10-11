<template lang="pug">
.container.my-3
  .container.bg-light.d-flex.justify-content-end.p-1.shadow
    button.btn.btn-success(@click="onSubmit")
      i.fas.fa-save
    button.btn.btn-danger.ml-1(@click="closeForm")
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
    };
  },
  methods: {
    closeForm() {
      EventBus.$emit('createForm:close');
    },
    async onSubmit(e) {
      e.preventDefault();
      const formData = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        formData.append(`files[${i}]`, this.files[i], Date.now() + file.name);
      }
      formData.append('name', this.name);
      formData.append('description', this.description);
      formData.append('date', new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' }));
      const status = await this.save(formData);
      this.sendMessage(status);
      this.closeForm();
    },
    async save(data) {
      this.loading = true;
      const { status } = await this.$http.post(
        `${this.$config.url}/item`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (status === 201) {
        this.add(data);
      }
      this.loading = true;
      return status;
    },
    sendMessage(code) {
      if (code === 201) {
        EventBus.$emit('message:showMessage', {
          message: 'Un nou slide a fost creat în prezentare.',
          status: 'success',
        });
      } else {
        EventBus.$emit('message:showMessage', {
          message: 'Eroare: Slide-ul nu a fost postat.',
          status: 'error',
        });
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
