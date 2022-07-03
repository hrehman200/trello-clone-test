<template>
  <v-container>

  <v-layout row align-center wrap>

    <v-flex sm12 mt-5>
      <h2>{{ board.name }} </h2>
    </v-flex>

    <v-flex sm3 v-for="list in lists" :key="list._id" pa-2>
      <v-card>
        <v-card-title>{{ list.name }}</v-card-title>
        <v-card-actions>
          <v-btn class="primary">See Tasks</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex sm3 pa-2>
      <v-card
      >
        <v-card-title>Create List</v-card-title>

        <v-card-text class="text--primary">
          <div>
            <v-form
              @submit.prevent="createList"
              ref="form"
              v-model="valid"
              lazy-validation
              v-if="!loading"  
            >
              <v-text-field
                v-model="list.name"
                :rules="notEmptyRules"
                label="Name"
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
              v-if="loading || loadingLists"
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
  name: 'boardComponent',
  data: (vm) => ({
    valid: false,
    dataready: false,
    board: {},
    list: {
      name: '',
      order: 0,
      archived: false,
    },
    notEmptyRules: [
      (v) => !!v || 'Field is required',
    ],
  }),

  async mounted() {
    try {
      this.board = await this.getBoard(this.$route.params.id);
      const lists = await this.findLists({ query: { boardId: this.$route.params.id } });
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    ...mapActions('boards', { getBoard: 'get' }),
    ...mapActions('lists', { findLists: 'find' }),

    createList() {
      if (this.valid) {
        try {
          const { List } = this.$FeathersVuex.api;
          this.list.boardId = this.$route.params.id;
          const list = new List(this.list);
          list.save();
          this.list = {
            name: '',
            order: 0,
            archived: false,
          };
        } catch (error) {
          console.log(error);
        }
      }
    },
  },

  computed: {
    ...mapState('boards', { loading: 'isGetPending' }),
    ...mapState('boards', { loadingLists: 'isFindPending', creatingList: 'isCreatePending' }),

    ...mapGetters('lists', { findListsInStore: 'find' }),
    
    lists() {
      return this.findListsInStore({ query: { boardId: this.$route.params.id } }).data;
    },
  },
};
</script>
