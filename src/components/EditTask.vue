<template>
  <div class="w-[]">
    <h1 class="my-5 uppercase font-mono text-zinc-500">Add New Task</h1>
    <v-form @submit.prevent="task_edit" id="task_add_form" v-model="valid">
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
          </v-col>
          <v-col cols="12" class="border bg-gray-200 mb-2">
            <tip-tap-vue
              v-model="title"
              :rules="descriptionRules"
              :counter="100"
              class=""
            >
              <template v-slot:label>
                <div>Description <small>(optional)</small></div>
              </template>
            </tip-tap-vue>
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
        <v-btn type="submit" form="task_add_form" color="thin" dark>Save</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
import TipTapVue from "./TipTap.vue";
export default {
  props: ["id"],
  components: {
    TipTapVue,
  },

  data: () => ({
    user_id: "",
    valid: false,
    name: "",
    title: "",

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
    snackbar: false,
    text: "Successfully Submitted",
  }),
  methods: {
    task_edit() {
      const editedData = {
        name: this.name,
        title: this.title,
        date: this.date,
      };
      let id = this.id;
      console.log(id);
      let current_id = this.$store.state.user.current_id;
      // console.log(this.title, this.name, this.date);
      // this.$emit("tasksub", false);
      this.$router.push({ path: "/" });

      this.$store.dispatch("task/task_edit", { editedData, id, current_id });
    },
  },
};
</script>

<style></style>
