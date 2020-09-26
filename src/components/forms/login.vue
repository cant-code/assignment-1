<template>
  <b-container fluid>
    <b-card no-body class="overflow-hidden mx-auto mt-4 card-size">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img src="https://picsum.photos/400/400/?image=20" height="100%" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body>
            <b-card-title class="h1 text-center">Login</b-card-title>
            <b-card-text>
              <b-form @submit="onSubmit">
                <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
                  <b-form-input id="input-1" v-model="form.email" type="email" required placeholder="Enter email" />
                </b-form-group>
                <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                  <b-form-input id="input-2" v-model="form.password" type="password" 
                  required placeholder="Enter password"/>
                </b-form-group>
                <b-form-group id="input-group-4">
                  <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
                    <b-form-checkbox :value=true>Remember Me</b-form-checkbox>
                  </b-form-checkbox-group>
                </b-form-group>
                <b-button block type="submit" variant="primary">Submit</b-button>
              </b-form>
            </b-card-text>
            <b-alert show dismissible v-if="checkSignup" fade>
              Successfully Registered.
            </b-alert>
            <b-alert show variant="danger" dismissible v-if="checkMessage" fade>
              {{ message }}
            </b-alert>
            <hr/>
            <b-button to="/signup" block variant="dark">Register</b-button>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: "Login",
  computed: {
    checkSignup() {
      return this.$route.params.success ? true : false;
    },
    checkMessage() {
      return this.message !== null ? true : false;
    }
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        checked: [false],
      },
      message : null,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$store.dispatch('user/loginUser', {
        "email": this.form.email,
        "password": this.form.password,
        "checked": this.form.checked
      }).then(() => this.$router.push('/')).catch((e) => this.message = e.message);
    },
  }
};
</script>

<style scoped>
.card-size {
  max-width: 75%;
}
</style>