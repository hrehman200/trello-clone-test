<template>
  <v-container>
    <v-form
    v-if="!loading"
    @submit.prevent="login"
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

    <v-btn
      color="info"
      class="mr-4"
      type="submit"
      :disabled="!valid"
    >
      Login
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
import { mapState, mapActions } from 'vuex';

export default {
  name: 'logIn',
  data: (vm) => ({
    valid: false,
    user: {
      username: '',
      password: '',
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
    ...mapState('auth', { loading: 'isAuthenticatePending' }),
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    async login() {
      try {
        const response = await this.$store.dispatch('auth/authenticate', {
          strategy: 'local',
          username: this.user.username,
          password: this.user.password,
        });
        console.log(response);
        this.$router.push('/boards');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
