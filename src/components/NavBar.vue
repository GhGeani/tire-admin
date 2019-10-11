<template lang="pug">
  nav.navbar.navbar-dark.text-white.bg-dark.fixed-bottom.py-1.d-flex
      ul.nav(v-if="logged")
        router-link.nav-item(to="/servicii" tag="li")
          i.fas.fa-tools
        router-link.nav-item(to="/vanzari" tag="li")
          i.fas.fa-shopping-cart
        router-link.nav-item(to="/anunturi" tag="li")
          i.fas.fa-bullhorn
        router-link.nav-item(to="/prezentare" tag="li")
          i.fas.fa-images
      ul.nav(v-if="logged")
        button.btn.nav-item(tag="li" @click="showForm")
          i.fas.fa-plus

</template>

<script>
import { auth } from '../utils/auth';
import { EventBus } from '../utils/eventbus';

export default {
  data() {
    return {
      logged: false,
    };
  },
  mounted() {
    EventBus.$on('User:logged', () => {
      this.logged = true;
    });
    if (auth.isAuthenticated()) {
      this.logged = true;
    }
  },
  methods: {
    showForm() {
      EventBus.$emit('createForm:show');
    },
  },
};
</script>

<style lang="stylus" scoped>
.navbar
  opacity .9
.nav-item
  padding .3rem
  padding-left .8rem
  padding-right .8rem
.nav-item:hover
  background-color grey
  transition 0.2s
  cursor pointer
  .fas
    color #54A2C6
  .nav-link
    color dark
.fas
.nav-link
  font-size 1.1rem

</style>
