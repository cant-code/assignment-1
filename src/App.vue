<template>
  <div id="app">
    <navBar v-if="this.$store.getters['user/getEmail']"/>
    <router-view/>
  </div>
</template>

<script>
import navBar from '@/components/navbar'
export default {
  components: {
    navBar
  }
}
</script>

<style>
body {
  background: #093028;
  background: -webkit-linear-gradient(to bottom, #237A57, #093028);
  background: linear-gradient(to bottom, #237A57, #093028);
  background-repeat: no-repeat;
  height: 100%;
  background-attachment: fixed;
}
</style>
