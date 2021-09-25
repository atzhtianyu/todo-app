<template>
  <div class="todo-item" :class="{ todo__selected: selected }">
    <div class="todo-item_head" @click="handleClick">
      <div class="todo_icon" :style="{ color }">
        <i :class="['fa', `fa-${todo.icon}`]"></i>
      </div>
      <div class="todo_menu"><i class="fa fa-ellipsis-v"></i></div>
    </div>
    <div class="todo-item_body">
      <p class="todo_tips">{{ todo.tasks.length }} Tasks</p>
      <h3 class="todo_title">{{ todo.name }}</h3>
      <div class="todo_progress">
        <span class="todo_progress_line">
          <i :style="{ width: progress, backgroundImage: progressColor }"></i>
        </span>
        <span class="todo_progress_num">{{ progress }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
    },
  },
  computed: {
    color() {
      return this.todo.colors[0];
    },
    progress() {
      const totalCount = this.todo.tasks.filter((t) => !t.deleted).length;
      const doneCount = this.todo.tasks.filter(
        (t) => !t.deleted && t.done
      ).length;
      return `${Math.round((doneCount / totalCount) * 100)}%`;
    },
    progressColor() {
      const colorLeft = `color-stop(30%, ${this.todo.colors[0]})`;
      const colorRight = `to(${this.todo.colors[1]})`;
      return `-webkit-gradient(linear, left bottom, right bottom, ${colorLeft}, ${colorRight})`;
    },
  },
  methods: {
    handleClick() {
      this.$router.push({
        path: "/detail",
        query: {
          iid: this.todo.iid,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.todo-item {
  flex: 1;
  margin: 0 8px;
  overflow: hidden;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  color: #666;
}

.todo-item_head {
  display: flex;
  padding: 20px;
  height: 44px;
  justify-content: space-between;
  align-items: flex-start;
  will-change: transform;
}

.todo-item_body {
  width: 80%;
  position: absolute;
  bottom: 30px;
  padding: 0 20px;
  will-change: transform;
}

.todo_icon {
  display: flex;
  width: 44px;
  height: 44px;
  border: 1px solid #eee;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

.todo_menu {
  color: #eee;
}

.todo_tips {
  opacity: 0.6;
  font-size: 13px;
  font-weight: 600;
}

.todo_title {
  margin-top: 6px;
  font-size: 32px;
}

.todo_progress {
  display: flex;
  align-items: center;
  margin-top: 30px;
}

.todo_progress_line {
  margin-right: 10px;
  flex: 1;
  height: 3px;
  background-color: #eee;

  i {
    display: block;
    height: 100%;
    transition: all 0.3s ease;
  }
}

.todo_progress_num {
  font-size: 12px;
}
</style>
