<template>
  <v-main>
    <h1 class="my-5 uppercase font-mono text-zinc-500">Add New Task</h1>
    <v-form @submit.prevent="addTask" id="task_add_form" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" class="border bg-gray-200 mb-2">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              :counter="15"
              label="Name"
              required
            ></v-text-field>
            <p class="text-red-500 flex justify-start">{{ errors.name }}</p>
          </v-col>
          <v-col cols="12" class="border bg-gray-200 mb-2">
            <tip-tap-vue
              v-model="title"
              :rules="descriptionRules"
              :counter="100"
              class=""
            >
            </tip-tap-vue>
            <p class="text-red-500 flex justify-start">
              {{ errors.title }}
            </p>
          </v-col>
          <v-col cols="12" class="border bg-gray-200">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Due Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
      <div class="my-5">
        <v-btn type="submit" form="task_add_form" color="thin" dark
          >Add Task</v-btn
        >
      </div>
    </v-form>
  </v-main>
</template>

<script>
import TipTapVue from "./TipTap.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    TipTapVue,
  },

  data: () => ({
    user_id: "",
    valid: false,
    name: "",
    title: "",
    id: Math.floor(Math.random() * 1000),
    errors: {
      name: "",
      title: "",
    },

    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 15 || "Name must be less than 15 characters",
    ],
    descriptionRules: [
      (v) => v.length <= 100 || "Description must be less than 100 characters",
    ],
    // items: ["True", "False"],
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
  }),
  computed: {
    ...mapState("user", ["current_id"]),
  },
  methods: {
    ...mapActions("task", ["task_add"]),
    addTask() {
      console.log(this.current_id);
      const newTask = {
        user_id: this.current_id,
        id: this.id,
        name: this.name,
        title: this.title,
        date: this.date,
        completed: false,
        status: "Not Done",
        completedBy: "-",
        modifiedBy: "-",
      };
      if (!this.validate(newTask)) {
        // this.snackbar = true;

        return;
      }

      console.log(newTask);
      this.$router.push({ path: "/" });
      this.task_add(newTask);
    },
    validate({ name, title }) {
      console.log(name);
      if (name === "") {
        this.errors.name = "Name should not be empty";
        return false;
      } else if (title === "") {
        this.errors.title = "Description should not be empty";
        return false;
      }
      return true;
    },
  },
};
</script>

<style></style>
