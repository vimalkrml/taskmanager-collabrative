import Vue from "vue";
import VueRouter from "vue-router";
import TasksPage from "../views/TasksPage.vue";
import UsersPage from "../views/UsersPage.vue";
import EditTask from "../components/EditTask.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: TasksPage,
  },
  {
    path: "/create",
    name: "create",
    component: () => import("../views/CreateTask.vue"),
  },
  {
    path: "/users",
    name: "users",
    component: UsersPage,
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: EditTask,
    props: true,
  },
  {
    path: "/createuser",
    name: "usercreate",
    component: () => import("../views/CreateUsers.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
