<template>
  <b-container fluid>
    <b-card no-body class="overflow-hidden mx-auto mt-4 card-size">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img src="https://picsum.photos/400/400/?image=1" height="100%" alt="Image" 
          class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body>
            <b-card-title class="h1 text-center">Signup</b-card-title>
            <b-card-text>
              <b-tabs card v-model="type">
              <b-tab title="Students" active>
              </b-tab>
              <b-tab title="Instructors">
              </b-tab>
              </b-tabs>
              <b-form @submit="onSubmit">
                <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
                  <b-form-input id="input-1" v-model="form.email" :state="emailValidation" type="email" 
                  required placeholder="Enter email" />
                  <b-form-invalid-feedback :state="emailValidation">
                    Invalid Email
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                  <b-form-input id="input-2" v-model="form.password" :state="passValidation" type="password" 
                  required placeholder="Enter password"/>
                  <b-form-invalid-feedback :state="passValidation">
                    Invalid Password
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group id="input-group-3" label="Confirm Password:" label-for="input-3">
                  <b-form-input id="input-3" v-model="form.confirmpass" :state="passConfirm" type="password" 
                  required placeholder="Confirm password"/>
                  <b-form-invalid-feedback :state="passConfirm">
                    Password must match.
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group id="input-group-4" label="Track:" label-for="input-4" v-if="checkTrack">
                  <b-form-select id="input-4" v-model="form.selected" :options="options" required></b-form-select>
                </b-form-group>
                <b-button block type="submit" variant="primary">Submit</b-button>
              </b-form>
            </b-card-text>
            <hr/>
            <b-button to="/login" block variant="dark">Login</b-button>
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
    emailValidation() {
      if(this.form.email === null) return null; 
      return /.+@.+\..+/.test(this.form.email);
    },
    passConfirm() {
      if(this.form.confirmpass === null) return null; 
      return this.form.password === this.form.confirmpass;
    },
    passValidation() {
      if(this.form.password === null) return null; 
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_@./#&+-]{8,}$/.test(this.form.password)
    },
    checkTrack() {
      return this.type === 0 ? true : false;
    }
  },
  data() {
    return {
      form: {
        email: null,
        password: null,
        confirmpass: null,
        selected: null,
      },
      type: 0,
      validation: {
        email: null,
        password: null
      },
      options: [
        { value: null, text: 'Please select some item' },
        { value: 'a', text: 'Beginner' },
        { value: 'b', text: 'Intermediate' },
        { value: 'c', text: 'Advanced' },
      ]
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
      this.$router.push({ name: 'Login', params: { success: true }});
    },
  }
};
</script>

<style scoped>
.card-size {
  max-width: 75%;
}
</style>