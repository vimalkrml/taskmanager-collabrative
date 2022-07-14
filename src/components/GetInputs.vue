<template>
  <v-content>
    <v-card-title>Add New Task</v-card-title>
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
          <!-- <v-col cols="10">
            <v-select
              v-model="select"
              :items="items"
              :rules="[(v) => !!v || 'Status is required']"
              label="Status"
              required
            ></v-select>
          </v-col> -->

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
        <v-content>
          <v-btn type="submit" form="task_add_form" color="thin" dark
            >Submit</v-btn
          >
        </v-content>
      </v-container>
    </v-form>
  </v-content>
</template>

<script>
import TipTapVue from "./Tip-Tap.vue";
export default {
  components: {
    TipTapVue,
  },

  data: () => ({
    valid: false,
    name: "",
    title: "",
    id: Math.floor(Math.random() * 1000),

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
  methods: {
    addTask() {
      const newTask = {
        id: this.id,
        name: this.name,
        title: this.title,
        date: this.date,
        completed: false,
        status: "Not Done",
      };
      // console.log(newTask);
      this.$store.dispatch("task_add", newTask);
      this.$router.push({ path: "/" });
      // this.newId;
      // this.name;
      // this.description;
    },
  },
};
</script>

<style></style>
