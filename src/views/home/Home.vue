<template>
  <div class="home">
    <app-bar title="TODO" left="bars" right="search" />
    <avatar />
    <gradient />
    <todo-list />
  </div>
</template>

<script>
import Gradient from "../../components/content/Gradient.vue";
import AppBar from "../../components/common/AppBar.vue";
import Avatar from "./childComps/Avatar.vue";
import TodoList from "./childComps/TodoList.vue";
export default {
  name: "Home",
  components: {
    AppBar,
    Avatar,
    Gradient,
    TodoList,
  },
};
</script>

<style lang="scss">
.home {
  height: 100%;
  width: 100%;
  overflow: hidden;
  color: white;
  // background: linear-gradient(30deg, #ff6262, #ffa947);
}
</style>
