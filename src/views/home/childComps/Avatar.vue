<template>
  <div class="avatar">
    <div class="avatar_face">
      <img src="../../../assets/avatar.jpg" alt="" />
    </div>
    <h2 class="avatar_name">Hello, Taro.</h2>
    <p class="avatar_tips">
      Looks like feel good<br />You have 6 tasks to do today.
    </p>
    <p class="avatar_date">TODAY : {{ today | dateString }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      today: new Date(),
    };
  },
  filters: {
    dateString(val) {
      return val
        .toDateString()
        .toUpperCase()
        .replace(/(\s\d{4})$/, ", $1");
    },
  },
};
</script>

<style lang="scss">
.avatar {
  display: flex;
  padding: 0 40px;
  height: 300px;
  justify-content: flex-end;
  flex-direction: column;
  transition: all 0.5s ease;
}

.avatar_face {
  width: 44px;
  height: 44px;
  border-radius: 100%;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba($color: #000000, $alpha: 0.2);

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.avatar_name {
  margin-top: 32px;
  padding: 0 6px;
  font-size: 32px;
  letter-spacing: 1px;
  font-weight: 300;
}

.avatar_tips {
  margin-top: 16px;
  padding: 0 6px;
  font-size: 13px;
  font-weight: 100;
  opacity: 0.8;
  line-height: 1.6em;
}

.avatar_date {
  margin-top: 44px;
  margin-bottom: 16px;
  padding: 0 6px;
  font-size: 14px;
}
</style>
