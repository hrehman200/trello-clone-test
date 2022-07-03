<template>
  <v-flex sm12 pa-2>
    <v-card>
      <v-card-title>Create Card</v-card-title>

      <v-card-text class="text--primary">
        <div>
          <v-form
            @submit.prevent="createCard"
            ref="form"
            v-model="valid"
            lazy-validation
            v-if="!isCreatePending"
          >
            <v-text-field
              v-model="card.title"
              :rules="notEmptyRules"
              label="Title"
              required
            ></v-text-field>

            <v-btn color="info" class="mr-4" type="submit" :disabled="!valid">
              Create
            </v-btn>
          </v-form>

          <v-progress-circular
            v-if="isCreatePending"
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'card-component',
  props: ['listId', 'boardId'],

  data: () => ({
    valid: false,
    dataready: false,
    card: {
      title: '',
      members: [],
    },
    notEmptyRules: [(v) => !!v || 'Field is required'],
  }),

  methods: {
    createCard() {
      if (this.valid) {
        try {
          const { Card } = this.$FeathersVuex.api;
          this.card.boardId = this.boardId;
          this.card.listId = this.listId;
          const card = new Card(this.card);
          card.save();
          this.card = {
            title: '',
            members: [],
          };
        } catch (error) {
          console.log(error);
        }
      }
    },
  },

  computed: {
    ...mapState('cards', ['isCreatePending']),
  },

};
</script>
