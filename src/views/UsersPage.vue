<template>
  <v-main>
    <v-snackbar v-model="toast" light>
      {{ toast }}
      <template v-slot:action="{ attrs }">
        <v-btn color="indigo" text v-bind="attrs" @click="user_toast_remove()">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-btn class="my-5" plain loading v-if="isLoading"></v-btn>
    <div v-else>
      <div v-if="users.length > 0">
        <div flat class="my-10 flex justify-between items-center text-2xl">
          <h1 class="font-bold">USERS</h1>
          <v-spacer></v-spacer>
          <v-btn depressed to="/createuser">ADD USER</v-btn>
        </div>
        <div>
          <v-list justify-center>
            <v-list-item
              v-for="user in users"
              :key="user.id"
              class="mb-2 bg-[#F5F5F5]"
            >
              <v-list-item-avatar>
                <v-img :src="user.imageurl" />
              </v-list-item-avatar>
              <v-list-item-content>
                {{ user.name }}
                <v-divider />
                {{ user.email }}
              </v-list-item-content>
              <lord-icon
                @click="user_delete(user.id)"
                src="https://cdn.lordicon.com/qsloqzpf.json"
                trigger="hover"
                colors="primary:#121331"
                class="cursor-pointer w-7"
              >
              </lord-icon>
            </v-list-item>
          </v-list>
        </div>
      </div>
      <no-data v-else />
    </div>
  </v-main>
</template>

<script>
import { mapActions, mapState } from "vuex";
import NoData from "../components/NoUser.vue";
export default {
  components: { NoData },
  data() {
    return {
      isLoading: true,
      snackbar: false,
    };
  },
  methods: {
    ...mapActions("user", ["user_index", "user_delete", "user_toast_remove"]),
  },
  computed: {
    ...mapState("user", ["users"]),
    ...mapState("user", {
      toast(state) {
        return state.toast;
      },
    }),
  },
  mounted() {
    this.user_index();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
};
</script>
