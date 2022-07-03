<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <h3>Trello Clone</h3>
      </div>

      <v-spacer></v-spacer>

      <div v-if="!payload">
        <v-btn
          href="/login"
          text
        >
          <span class="mr-2">Login</span>
          <v-icon>mdi-login</v-icon>
        </v-btn>

        <v-btn
          href="/signup"
          text
        >
          <span class="mr-2">Signup</span>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>

      <div v-if="payload">

        <v-avatar
          size="36px"
        >
          <img :src="payload.user.imageUrl" alt="avatar" >
        </v-avatar>

        <v-btn
          @click="logout"
          text
        >
          <span class="mr-2">Logout</span>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',

  data: () => ({
    //
  }),

  computed: {
    ...mapState('auth', ['payload']),
  },

  methods: {
    ...mapActions('auth', { authLogout: 'logout' }),
    async logout() {
      try {
        await this.authLogout();
        this.$router.push('/login');
      } catch (error) {
        console.log(error);
      }
    },
  },

};
</script>
