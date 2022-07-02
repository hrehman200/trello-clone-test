<template>
  <v-container>

  <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>

  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'boardsComponent',
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
    async login() {
      try {
        const response = await this.$store.dispatch('auth/authenticate', {
          strategy: 'local',
          ...this.user,
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
