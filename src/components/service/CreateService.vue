<template lang="pug">
.container.my-3
  .container.bg-light.d-flex.justify-content-end.p-1.shadow
    button.btn.btn-lg.mx-1(@click="onSubmit" v-if="!loading")
      i.fas.fa-save(v-if="!loading")
      .spinner-border.text-dark(v-else)
    button.btn.btn-lg.mx-1(@click="closeForm")
      i.fas.fa-times
  form.container.p-3.bg-light.shadow.my-3.form-group.m-auto(v-on:submit="onSubmit")
    input.form-control(
      type="text"
      v-model="name"
      placeholder="Numele serviciului..."
    )
    textarea.form-control.change-border.w-100(
      v-model="description"
      rows="3"
      placeholder="Descrierea serviciului...")
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
      name: '',
      description: '',
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
      if(this.file)
        formData.append('file', this.file, Date.now());
      formData.append('description', this.description);
      formData.append('name', this.name);
      const status = await this.save(formData);
      this.sendMessage(status);
      this.closeForm();
    },
    async save(data) {
      this.loading = true;
      const { status } = await this.$http.post(
        `${this.$config.url}/info`,
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
      EventBus.$emit('service:new', data);
    },
    handleFileUpload() {
      // eslint-disable-next-line
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
