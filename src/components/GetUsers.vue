<template>
  <v-main>
    <h1 class="my-5 uppercase font-mono text-zinc-500">Add New User</h1>
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
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :counter="25"
              label="Email"
              required
            ></v-text-field>
            <p class="text-red-500 flex justify-start">{{ errors.email }}</p>
          </v-col>
          <v-col cols="12" class="border bg-gray-200 mb-2">
            <v-text-field
              v-model="imageurl"
              label="Image URL"
              required
            ></v-text-field>
            <p class="text-red-500 flex justify-start">{{ errors.imageurl }}</p>
          </v-col>
        </v-row>
      </v-container>
      <div class="my-5">
        <v-btn type="submit" form="task_add_form" color="thin" dark
          >ADD USER</v-btn
        >
      </div>
    </v-form>
  </v-main>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    valid: false,
    name: "",
    email: "",
    imageurl: "",
    errors: {
      name: "",
      email: "",
      imageurl: "",
    },
    id: Math.floor(Math.random() * 20),
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 15 || "Name must be less than 15 characters",
    ],
    emailRules: [
      (v) => !!v || "Email is required",
      (v) => v.length <= 25 || "Email must be less than 25 characters",
    ],
  }),
  methods: {
    ...mapActions("user", ["user_add"]),
    addTask() {
      const newUser = {
        id: this.id,
        name: this.name,
        email: this.email,
        imageurl: this.imageurl,
      };

      if (this.validate(newUser)) {
        console.log(newUser);
        this.user_add(newUser);
        this.$router.push({ path: "/users" });
      }
    },
    validate({ name, email, imageurl }) {
      console.log(name);
      if (name === "") {
        this.errors.name = "Name should not be empty";
        return false;
      } else if (email === "") {
        this.errors.email = "Email should not be empty";
        return false;
      } else if (imageurl === "") {
        this.errors.imageurl = "URL should not be empty";
        return false;
      }
      return true;
    },
  },
};
</script>

<style></style>
