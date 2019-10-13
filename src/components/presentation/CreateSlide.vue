<template lang="pug">
.container.my-3
  .container.bg-dark.d-flex.justify-content-end.shadow
    button.btn.btn-lg.text-success(@click="onSubmit")
      i.fas.fa-save(v-if="!loading")
      .spinner-border(v-else)
    button.btn.btn-lg.text-danger(@click="closeForm")
      i.fas.fa-times
  form.container.p-3.bg-light.shadow.my-3.form-group.m-auto(v-on:submit="onSubmit")
    textarea.form-control.change-border.w-100(
      v-model="text"
      rows="3"
      placeholder="Textul imaginii (opțional)")
    input.mt-1(
      type="file"
      id="file"
      ref="file"
      v-on:change="handleFileUpload()"
      class="form-control-file"
      )
</template>

<script>
import { EventBus } from '../../utils/eventbus';

export default {
  name: 'create-slide',
  data() {
    return {
      text: '',
      file: '',
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
      formData.append('file', this.file, Date.now());
      formData.append('text', this.text);
      await this.save(formData);
      this.closeForm();
    },
    async save(data) {
      try {
        this.loading = true;
        const response = await this.$http.post(
          `${this.$config.url}/slide`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        if (response.status === 201) {
          this.add(response.data);
          EventBus.$emit('message:showMessage', {
            message: 'Un nou slide a fost creat în prezentare.',
            status: 'success',
          });
        }
        this.text = '';
        this.$refs.file.value = '';
        this.file = '';
        this.loading = false;
      } catch (error) {
        EventBus.$emit('message:showMessage', {
          message: 'Eroare: Slide-ul nu a fost postat.',
          status: 'error',
        });
      }
    },
    add(data) {
      EventBus.$emit('slide:new', data);
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
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
