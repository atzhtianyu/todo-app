<template>
  <div class="todo-detail"></div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
    };
  },
  created() {
    this.iid = this.$route.query.iid;
  },
};
</script>

<style></style>
