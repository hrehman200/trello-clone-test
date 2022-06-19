<template>
  <v-container>
    <v-form @submit.prevent="signup"
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="user.username"
      :rules="notEmptyRules"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.password"
      :rules="notEmptyRules"
      label="Password"
      type="password"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.confirmPassword"
      :rules="confirmPasswordRules"
      label="Confirm Password"
      type="password"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.displayName"
      :rules="notEmptyRules"
      label="Display Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.imageUrl"
      :rules="notEmptyRules"
      label="Image URL"
      required
    ></v-text-field>

    <v-btn
      color="info"
      class="mr-4"
      type="submit"
      :disabled="!valid"
    >
      Signup
    </v-btn>
  </v-form>
  </v-container>
</template>

<script>

export default {
  name: 'signUp',
  data: (vm) => ({
    valid: false,
    user: {
      username: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      imageUrl: '',
    },
    notEmptyRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 20) || 'Name must be less than 20 characters',
    ],
    confirmPasswordRules: [
      (confirmPassword) => confirmPassword === vm.user.password || 'Password must match',
    ],
  }),
  created() {

  },
  methods: {
    async signup() {
      try {
        const { User } = this.$FeathersVuex.api;
        const u = await new User(this.user).save();
        console.log(u);
        this.$router.push('/login');
      } catch (error) {
        console.log('---');
        console.log(error);
      }
    },
  },
};
</script>
