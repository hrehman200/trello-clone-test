<template>
  <v-container>

  <v-layout row align-center wrap>
    <v-flex sm3 v-for="board in boards" :key="board._id" pa-2>
      <v-card>
        <v-img height="100px" :src="board.background" class="white--text">
          <v-card-title>{{ board.name }}</v-card-title>
        </v-img>
        <v-card-actions>
          <v-btn class="primary" :to="{ name: 'boardComponent', params: { id:board._id } }">
            See Tasks
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex sm3 pa-2>
      <v-card
      >
        <v-card-title>Create Board</v-card-title>

        <v-card-text class="text--primary">
          <div>
            <v-form
              @submit.prevent="createBoard"
              ref="form"
              v-model="valid"
              lazy-validation
              v-if="!creating"
            >
              <v-text-field
                v-model="board.name"
                :rules="notEmptyRules"
                label="Name"
                required
              ></v-text-field>

              <v-text-field
                v-model="board.background"
                :rules="notEmptyRules"
                label="Background"
                type="text"
                required
              ></v-text-field>

              <v-btn
                color="info"
                class="mr-4"
                type="submit"
                :disabled="!valid"
              >
                Create
              </v-btn>
            </v-form>

            <v-progress-circular
              v-if="creating"
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>

          </div>
        </v-card-text>
      </v-card>
    </v-flex>

  </v-layout>

  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'boardsComponent',
  data: () => ({
    valid: false,
    board: {
      name: '',
      background: '',
    },
    notEmptyRules: [
      (v) => !!v || 'Field is required',
    ],
  }),

  async mounted() {
    const boards = await this.findBoards();
    console.log(boards);
  },

  methods: {
    ...mapActions('boards', { findBoards: 'find' }),

    createBoard() {
      if (this.valid) {
        try {
          const { Board } = this.$FeathersVuex.api;
          const board = new Board(this.board);
          board.save();
          this.board = {
            name: '',
            background: '',
          };
        } catch (error) {
          console.log(error);
        }
      }
    },
  },

  computed: {
    ...mapState('boards', {
      loading: 'isFindPending',
      creating: 'isCreatePending',
    }),
    ...mapState('auth', ['payload']),
    ...mapGetters('boards', { findBoardsInStore: 'find' }),

    boards() {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      return this.findBoardsInStore({ query: { ownerId: this.payload.user._id } }).data;
    },
  },
};
</script>
