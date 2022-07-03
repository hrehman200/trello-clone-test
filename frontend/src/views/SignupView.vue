<template>
  <v-container>
    <v-form
    v-if="!loading"
    @submit.prevent="signup"
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

  <v-progress-circular
      v-if="loading"
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>

  </v-container>
</template>

<script>
import { mapState } from 'vuex';

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
  computed: {
    ...mapState('users', { loading: 'isCreatePending' }),
  },
  methods: {
    async signup() {
      try {
        const { User } = this.$FeathersVuex.api;
        const u1 = new User(this.user);
        await u1.create();
        this.$router.push('/login');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
