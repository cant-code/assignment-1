<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" fixed>
    <b-navbar-brand>Truexam</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item exact to="/" exact-active-class="active">Home</b-nav-item>
        <b-nav-item exact to="/evaluation" exact-active-class="active">Evaluation</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item @click="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('user/logoutUser').then(() => this.$router.push('/login'));
    }
  }
}
</script>