<template lang="pug">
.container.h-100.text-center.d-flex.align-items-center
  form.form-signin(v-on:submit.prevent="onSubmit")
    .alert.alert-danger(v-if="failed") Nume sau parolă greșită!
    input.form-control(type='text' placeholder='Numele' required autofocus v-model="name")
    input.form-control(type='password' placeholder='Parola' required v-model="pass")
    button.btn.btn-lg.btn-dark.btn-block(type='submit') Loghează-te
</template>

<script>
import { auth } from '../utils/auth';
import { EventBus } from '../utils/eventbus';

export default {
  name: 'login',
  data() {
    return {
      name: '',
      pass: '',
      failed: false,
      apiResp: {},
    };
  },
  methods: {
    async onSubmit() {
      try {
        this.apiResp = await this.$http.post(`${this.$config.url}/login`, {
          username: this.name,
          password: this.pass,
        });
        const { token } = this.apiResp.data;
        auth.token = token;
        EventBus.$emit('User:logged');
        this.$router.push('/servicii');
        this.resetCreds();
      } catch (e) {
        this.failed = true;
      }
    },
    resetCreds() {
      this.name = '';
      this.pass = '';
    },
  },
};
</script>

<style lang="stylus" scoped>
.form-signin
  width 100%
  max-width 330px
  padding 15px
  margin auto

.form-signin
.form-control
  position relative
  box-sizing border-box
  height auto
  padding 10px
  font-size 16px

.form-signin
.form-control:focus
  z-index 2

input[type="text"]
  margin-bottom -1px
  border-bottom-right-radius 0
  border-bottom-left-radius 0

input[type="password"]
  margin-bottom 10px
  border-top-left-radius 0
  border-top-right-radius 0

@media (min-width: 768px)
  .bd-placeholder-img-lg
    font-size 3.5rem
</style>
