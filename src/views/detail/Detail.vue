<template>
  <div class="todo-detail">
    <app-bar @left="returnHome" />
    <div class="todo">
      <div class="todo_head">
        <div class="todo_icon" :style="{ color }">
          <i :class="['fa', `fa-${todo.icon}`]"></i>
        </div>
        <div class="todo_menu"><i class="fa fa-ellipsis-v"></i></div>
      </div>
      <div class="todo_body">
        <p class="todo_tips">{{ todo.tasks.length }} Tasks</p>
        <h3 class="todo_title">{{ todo.name }}</h3>
        <div class="todo_progress">
          <span class="todo_progress_line">
            <i :style="{ width: progress, backgroundImage: progressColor }"></i>
          </span>
          <span class="todo_progress_num">{{ progress }}</span>
        </div>
        <div class="todo_tasks">
          <h4 class="todo_subtitle" v-if="todayTasks.length">Today</h4>
          <ul>
            <li v-for="task in todayTasks" :key="task.id">
              <task :task="task" />
            </li>
          </ul>
          <h4 class="todo_subtitle" v-if="tomorrowTasks.length">Tomorrow</h4>
          <ul>
            <li v-for="task in tomorrowTasks" :key="task.id">
              <task :task="task" />
            </li>
          </ul>
          <h4 class="todo_subtitle" v-if="outdatedTasks.length">Outdated</h4>
          <ul>
            <li v-for="task in outdatedTasks" :key="task.id">
              <task :task="task" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { today, tomorrow } from "../../common/utils";
import { mapGetters, mapMutations } from "vuex";
import AppBar from "../../components/common/AppBar.vue";
import Task from "./childComps/Task.vue";
export default {
  name: "Detail",
  components: {
    Task,
    AppBar,
  },
  data() {
    return {
      iid: null,
      todo: {},
    };
  },
  created() {
    this.iid = this.$route.query.iid;
    this.todo = this.$store.state.todos[this.iid];
  },
  computed: {
    ...mapGetters(["getTodo"]),
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
    todayTasks() {
      return this.todo.tasks.filter((task) => {
        return task.date >= today && task.date <= tomorrow;
      });
    },
    tomorrowTasks() {
      return this.todo.tasks.filter((task) => {
        return task.date >= tomorrow;
      });
    },
    outdatedTasks() {
      return this.todo.tasks.filter((task) => {
        return task.date < today;
      });
    },
  },
  methods: {
    ...mapMutations(["unselectTodo"]),
    returnHome() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss">
.todo {
  flex: 1;
  margin: 0 8px;
  overflow: hidden;
  color: #666;
}

.todo_head {
  display: flex;
  padding: 20px;
  height: 44px;
  justify-content: space-between;
  align-items: flex-start;
  will-change: transform;
}

.todo_body {
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

.todo_tasks {
  opacity: 1;
}

.todo_subtitle {
  margin-top: 32px;
  margin-bottom: 8px;
  color: #999;
}

.todo_detail {
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  border-radius: 0;
  background-color: #fff;
  color: #666;
  will-change: top, left, width, height;

  .todo {
    margin: 0;
    margin-top: -44px;
    padding: 0 20px;
    box-shadow: none;
  }

  .todo_head,
  .todo_body {
    transform: translate3d(0, 88px, 0);
  }

  .todo_menu {
    opacity: 0;
  }

  .todo_tasks {
    opacity: 1;
    transform: scaleY(1);
  }

  .app_bar {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>
